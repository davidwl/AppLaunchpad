const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import { GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import {
  AppLaunchpadConfig,
  AppLaunchpadFeatureToggles,
  AppLaunchpadI18N,
  AppLaunchpadRouting
} from '../../../src/core-api';
import { Routing } from '../../../src/services/routing';
import { config } from '../../../src/core-api/config';

describe('Routing-helpers', () => {
  describe('substituteDynamicParamsInObject', () => {
    let input, input2, paramMap, expectedOutput;
    beforeEach(() => {
      input = {
        key1: 'something',
        key2: ':group'
      };
      input2 = {
        key1: 'something',
        key2: 'sth:group/sth'
      };
      paramMap = {
        group: 'mygroup'
      };

      expectedOutput = {
        key1: 'something',
        key2: 'mygroup'
      };
    });

    it('substitutes an object', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input, paramMap)).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal(':group');
    });
    it('substitutes an object using custom prefix', () => {
      input.key2 = '#group';

      expect(RoutingHelpers.substituteDynamicParamsInObject(input, paramMap, '#')).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal('#group');
    });
    it('does not substitutes an object without contains', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input2, paramMap, undefined, false).key2).to.equal(
        input2.key2
      );
    });
    it('substitutes an object with contains', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input2, paramMap, undefined, true).key2).to.equal(
        'sthmygroup/sth'
      );
    });
  });

  describe('mapPathToNode', () => {
    let node;
    beforeEach(() => {
      node = {
        pathSegment: ':id',
        parent: {
          pathSegment: 'home'
        }
      };
    });
    it('happy path', () => {
      expect(RoutingHelpers.mapPathToNode('/home/234/subpage', node)).to.equal('/home/234');
      expect(RoutingHelpers.mapPathToNode('/home/234/', node)).to.equal('/home/234');
    });
    it('node not an ancestor', () => {
      expect(RoutingHelpers.mapPathToNode('/home2/234/subpage', node)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode('/home', node)).to.be.undefined;
    });
    it('wrong input corner cases', () => {
      expect(RoutingHelpers.mapPathToNode(undefined, undefined)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode('/home', undefined)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode(undefined, node)).to.be.undefined;
    });
  });

  describe('substitute locale variable', () => {
    beforeEach(() => {
      global['sessionStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      sinon.stub(config, 'configChanged');
      sinon.stub(AppLaunchpadI18N, '_notifyLocaleChange');
      AppLaunchpadI18N.setCurrentLocale('en');
    });
    afterEach(() => {
      sinon.restore();
    });

    it('getI18nViewUrl - substitutes {i18n.currentLocale} variable to current locale', () => {
      const viewUrl = '/{i18n.currentLocale}/microfrontend.html';
      const expected = '/en/microfrontend.html';

      expect(RoutingHelpers.getI18nViewUrl(viewUrl)).to.equal(expected);
    });

    it('No substitution if {i18n.currentLocale} variable is not provided', () => {
      const viewUrl = '/{i18n}/microfrontend.html';
      const expected = '/{i18n}/microfrontend.html';

      expect(RoutingHelpers.getI18nViewUrl(viewUrl)).to.equal(expected);
    });

    it('substituteViewUrl - substitutes {i18n.currentLocale} variable to current locale', () => {
      const viewUrl = '/{i18n.currentLocale}/microfrontend.html';
      const expected = '/en/microfrontend.html';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });

    it('substituteViewUrl - substitutes nested context variable', () => {
      const viewUrl = '/{i18n.currentLocale}/microfrontend.html#/:var1/{context.nested.value}/{nodeParams.param1}';
      const expected = '/en/microfrontend.html#/var1_value/context_nested_value/nodeparam_value';

      expect(
        RoutingHelpers.substituteViewUrl(viewUrl, {
          pathParams: { var1: 'var1_value' },
          context: { nested: { value: 'context_nested_value' } },
          nodeParams: { param1: 'nodeparam_value' }
        })
      ).to.equal(expected);
    });
  });
  describe('substitute search query params', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('substitutes search query parameter', () => {
      sinon.stub(AppLaunchpadRouting, 'getSearchParams').returns({ applaunchpad: 'rocks' });
      const viewUrl = '/microfrontend.html?applaunchpad={routing.queryParams.applaunchpad}';
      const expected = '/microfrontend.html?applaunchpad=rocks';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });
    it('substitutes search query parameter', () => {
      sinon.stub(AppLaunchpadRouting, 'getSearchParams').returns({ mario: 'rocks' });
      const viewUrl = '/microfrontend.html?applaunchpad={routing.queryParams.applaunchpad}';
      const expected = '/microfrontend.html';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });
  });

  describe('defaultChildNodes', () => {
    let mockPathData;
    beforeEach(() => {
      mockPathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: [
              {
                pathSegment: 'stakeholders',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/stakeholders'
              },
              {
                pathSegment: 'customers',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
              }
            ]
          }
        ],
        context: {}
      };
    });

    it('should return first child if no defaultChildNode is set', async () => {
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'customers');
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return first child that has viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              viewUrl: '/sampleapp.html#/myPath/child'
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'child');
    });

    it('should return first child that has externalLink.url defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'child');
    });

    it('should return first node that has pathSegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'pathToHome',
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'pathToHome');
    });

    it('should return undefined if at least one of children has no pathsegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              label: 'still no viewUrl'
            },
            {
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), undefined);
    });

    it('should return child that has pathSegment and viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'home');
    });
  });

  describe('applyPathParams', () => {
    it('empty path should not fail', () => {
      expect(RoutingHelpers.applyPathParams('', {})).to.equal('');
    });
    it('replace two parameters', () => {
      expect(
        RoutingHelpers.applyPathParams('/projects/:project/details/:entry', {
          project: 'pr1',
          entry: 'e23'
        })
      ).to.equal('/projects/pr1/details/e23');
    });
  });

  describe('getContext', () => {
    const context = { someValue: 'foo' };
    const node = {
      context,
      externalLink: { url: 'https://someurl.com', sameWindow: false },
      label: 'External link'
    };
    it('get context from node', () => {
      assert.deepEqual(RoutingHelpers.getContext(node, undefined), context);
      assert.deepEqual(RoutingHelpers.getContext(node, null), context);
    });
    it('get context directly', () => {
      const ctx = { someValue: 'bar' };
      assert.deepEqual(RoutingHelpers.getContext(node, ctx), ctx);
    });
    it('get context with parent node', () => {
      const parentContext = { otherValue: 'parent' };
      const nodeWithParent = { ...node, parent: { context: parentContext } };
      const expect = { ...context, ...parentContext };
      assert.deepEqual(RoutingHelpers.getContext(nodeWithParent, undefined), expect);
      assert.deepEqual(RoutingHelpers.getContext(nodeWithParent, null), expect);
    });
  });

  describe('buildRoute', () => {
    const node = {
      pathSegment: 'one',
      parent: {
        pathSegment: 'projects',
        parent: {
          pathSegment: 'home'
        }
      }
    };
    it('without params', () => {
      assert.equal(RoutingHelpers.buildRoute(node, '/' + node.pathSegment), '/home/projects/one');
    });
    it('with params', () => {
      const params = 'sort=desc&filter=false';
      assert.equal(RoutingHelpers.buildRoute(node, '/' + node.pathSegment, params), '/home/projects/one?' + params);
    });
  });
  describe('getRouteLink', () => {
    beforeEach(() => {
      global['sessionStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      sinon.stub(AppLaunchpadConfig, 'getConfigBooleanValue');
      sinon.stub(Routing, 'buildFromRelativePath');
      sinon.stub(RoutingHelpers, 'buildRoute');
      sinon.stub(GenericHelpers, 'replaceVars');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('external link with context templating', () => {
      const node = {
        externalLink: { url: 'https://applaunchpad.io?foo={context.someValue}', sameWindow: true },
        context: { someValue: 'bar' }
      };
      const expected = 'https://applaunchpad.io?foo=bar';
      GenericHelpers.replaceVars.returns(expected);
      assert.equal(RoutingHelpers.getRouteLink(node, {}), expected);
    });
    it('when it starts with /', () => {
      const expected = '/projects';
      const given = {
        link: expected,
        pathSegment: 'something-else'
      };

      assert.equal(RoutingHelpers.getRouteLink(given), expected);
      sinon.assert.notCalled(Routing.buildFromRelativePath);
    });
    it('calls build function for relative links', () => {
      const given = {
        link: 'projects',
        pathSegment: 'something-else'
      };
      Routing.buildFromRelativePath.returns(`/${given.link}`);

      assert.equal(RoutingHelpers.getRouteLink(given), '/projects');
      sinon.assert.calledWith(Routing.buildFromRelativePath, given);
    });
    it('on pathSegment calls getRoute and replaceVars', () => {
      const expected = '/projects/something-else';
      const given = {
        pathSegment: 'something-else'
      };

      RoutingHelpers.buildRoute.returns(expected);
      GenericHelpers.replaceVars.returns(expected);

      assert.equal(RoutingHelpers.getRouteLink(given), expected);

      sinon.assert.notCalled(Routing.buildFromRelativePath);
      sinon.assert.calledWith(RoutingHelpers.buildRoute, given, '/' + given.pathSegment);
      sinon.assert.calledWith(GenericHelpers.replaceVars, expected, undefined, ':', false);
    });
  });
  describe('calculateNodeHref', () => {
    beforeEach(() => {
      global['sessionStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      sinon.stub(RoutingHelpers, 'getRouteLink');
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('get node href', () => {
      const url = 'https://applaunchpad-project.io';
      const node = {
        externalLink: { url },
        link: 'something',
        pathSegment: 'something-else'
      };
      RoutingHelpers.getRouteLink.returns({ url });
      expect(RoutingHelpers.calculateNodeHref(node, {})).to.equal('https://applaunchpad-project.io');
    });
  });
  describe('getNodeHref', () => {
    beforeEach(() => {
      sinon.stub(AppLaunchpadConfig, 'getConfigBooleanValue');
      sinon.stub(RoutingHelpers, 'getRouteLink');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns undefined on falsy config value', () => {
      AppLaunchpadConfig.getConfigBooleanValue.returns(false);

      expect(RoutingHelpers.getNodeHref({}, {})).to.equal(undefined);
      sinon.assert.notCalled(RoutingHelpers.getRouteLink);
      sinon.assert.calledWith(AppLaunchpadConfig.getConfigBooleanValue, 'navigation.addNavHrefs');
    });
    it('returns valid link on url object', () => {
      AppLaunchpadConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns({ url: '/test' });
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal('/test');
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
    it('returns valid link on string received', () => {
      AppLaunchpadConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns('/test');
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal('/test');
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
  });
  describe('getLastNodeObject', () => {
    let mockPathData;

    it('return last node of navigationPath', () => {
      mockPathData = {
        navigationPath: [
          {
            pathSegment: 'project1'
          },
          {
            pathSegment: 'project2'
          },
          {
            pathSegment: 'project3'
          }
        ]
      };
      assert.deepEqual(RoutingHelpers.getLastNodeObject(mockPathData), {
        pathSegment: 'project3'
      });
    });

    it('should not fail on empty navigationPath', () => {
      mockPathData = {
        navigationPath: []
      };
      expect(RoutingHelpers.getLastNodeObject(mockPathData)).to.deep.equal({});
    });
  });

  describe('parseParams', () => {
    let mockParams;

    it('return pairs of params', () => {
      mockParams = 'test=true&foo=bar';
      assert.deepEqual(RoutingHelpers.parseParams(mockParams), {
        test: 'true',
        foo: 'bar'
      });
    });

    it('should not fail on empty params', () => {
      mockParams = '';
      expect(RoutingHelpers.parseParams(mockParams)).to.deep.equal({});
    });

    it('return pairs of params with a space and a plus', () => {
      mockParams = 'test=true+abc&foo=bar%2Babc';
      assert.deepEqual(RoutingHelpers.parseParams(mockParams), {
        test: 'true abc',
        foo: 'bar+abc'
      });
    });
  });

  describe('findViewGroup', () => {
    const noViewGroupInNode = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNode = {
      link: 'child-node',
      viewGroup: 'tets 1',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNodeParent = {
      link: 'child-node',
      viewUrl: './relative',
      parent: {
        pathSegment: 'parent-node',
        viewGroup: 'tets 1-1',
        viewUrl: './relative/foo/bar'
      }
    };

    const viewGroupInParentOfNodeParent = {
      link: 'child-node',
      viewUrl: 'http://bla.blub/but/something/else',
      parent: {
        pathSegment: 'parent-node',
        parent: {
          pathSegment: 'parent-parent-node',
          viewGroup: 'tets 1-1-1',
          viewUrl: 'http://bla.blub/foo/bar'
        }
      }
    };

    const viewGroupInParentOfNodeParentDifferentUrl = {
      link: 'child-node',
      viewUrl: 'http://bla2.blub/foo/bar',
      parent: {
        pathSegment: 'parent-node',
        parent: {
          pathSegment: 'parent-parent-node',
          viewGroup: 'tets 1-1-1',
          viewUrl: 'http://bla.blub/foo/bar'
        }
      }
    };

    it('return viewGroup from node', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInNode), 'tets 1');
    });

    it('return viewGroup from node.parent', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInNodeParent), 'tets 1-1');
    });

    it('return viewGroup from parent at node.parent', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInParentOfNodeParent), 'tets 1-1-1');
    });

    it('do not return viewGroup from parent at node.parent if domains do not match', () => {
      assert.equal(RoutingHelpers.findViewGroup(viewGroupInParentOfNodeParentDifferentUrl), undefined);
    });

    it('return undefined if viewGroup is not inside node', () => {
      assert.equal(RoutingHelpers.findViewGroup(noViewGroupInNode), undefined);
    });
  });
  describe('set feature toggle from url', () => {
    beforeEach(() => {
      sinon.stub(AppLaunchpadFeatureToggles, 'setFeatureToggle');
    });
    afterEach(() => {
      sinon.restore();
    });
    let mockPath = '/projects/pr1/settings?ft=test';
    it('setFeatureToggle will be called', () => {
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(AppLaunchpadFeatureToggles.setFeatureToggle, 'test');
    });
    it('setFeatureToggle will be called with two featureToggles', () => {
      mockPath = '/projects/pr1/settings?ft=test,test2';
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(AppLaunchpadFeatureToggles.setFeatureToggle, 'test');
      sinon.assert.calledWith(AppLaunchpadFeatureToggles.setFeatureToggle, 'test2');
    });
    it("setFeatureToggle won't be called with wrong queryParam name", () => {
      RoutingHelpers.setFeatureToggles('fft', mockPath);
      sinon.assert.notCalled(AppLaunchpadFeatureToggles.setFeatureToggle);
    });
  });

  it('getHashQueryParamSeparator', () => {
    assert.equal(RoutingHelpers.getHashQueryParamSeparator(), '?');
  });

  describe('getModalViewParamName', () => {
    beforeEach(() => {
      sinon.stub(AppLaunchpadConfig, 'getConfigValue');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('without config value', () => {
      assert.equal(RoutingHelpers.getModalViewParamName(), 'modal');
    });
    it('without config value', () => {
      AppLaunchpadConfig.getConfigValue.returns('custom');
      assert.equal(RoutingHelpers.getModalViewParamName(), 'custom');
    });
  });

  describe('getModalPathFromPath & getModalParamsFromPath', () => {
    const mockLocation = new URL('http://localhost');
    beforeEach(() => {
      sinon.stub(RoutingHelpers, 'getModalViewParamName').returns('modal');
      sinon.stub(RoutingHelpers, 'getLocation');
      RoutingHelpers.getLocation.returns(mockLocation);
      mockLocation.href = 'http://localhost';
    });
    afterEach(() => {
      sinon.restore();
    });
    it('without modal param', () => {
      assert.equal(RoutingHelpers.getModalPathFromPath('/path/one'), null);
    });
    it('with modal', () => {
      mockLocation.search = '?modal=%2Fhome%2Fchild-2';
      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
    });
    it('with modal params', () => {
      mockLocation.search = '?modal=%2Fhome%2Fchild-2&modalParams=%7B%22title%22%3A%22Real%20Child%22%7D';
      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
      assert.deepEqual(RoutingHelpers.getModalParamsFromPath('defined through stub'), { title: 'Real Child' });
    });
    it('with custom modal param name', () => {
      mockLocation.search = '?custom=%2Fhome%2Fchild-2&customParams=%7B%22title%22%3A%22Real%20Child%22%7D';
      RoutingHelpers.getModalViewParamName.returns('custom');

      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
      assert.deepEqual(RoutingHelpers.getModalParamsFromPath('defined through stub'), { title: 'Real Child' });
    });
  });

  describe('encodeParams', () => {
    it('empty params', () => {
      assert.equal(RoutingHelpers.encodeParams({}), '');
    });
    it('simple params', () => {
      assert.equal(
        RoutingHelpers.encodeParams({
          one: 'eins',
          two: 'zwei'
        }),
        'one=eins&two=zwei'
      );
    });
    it('advanced params', () => {
      assert.equal(
        RoutingHelpers.encodeParams({
          ['a-key']: JSON.stringify({ key: 'value' })
        }),
        'a-key=%7B%22key%22%3A%22value%22%7D'
      );
    });
  });

  describe('Handle core search params from client', () => {
    let currentNode;
    beforeEach(() => {
      currentNode = {
        clientPermissions: {
          urlParameters: {
            applaunchpad: {
              read: true,
              write: true
            }
          }
        }
      };
      sinon.stub(AppLaunchpadRouting, 'getSearchParams').returns({ applaunchpad: 'rocks', test: 'tets' });
      AppLaunchpadRouting.addSearchParams = sinon.spy();
      console.warn = sinon.spy();
    });
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });
    it('Client can read allowed search param', () => {
      assert.deepEqual(RoutingHelpers.prepareSearchParamsForClient(currentNode), { applaunchpad: 'rocks' });
    });
    it('Client can write allowed search params', () => {
      RoutingHelpers.addSearchParamsFromClient(currentNode, { applaunchpad: 'rocks', test: 'tets' });
      sinon.assert.calledWith(AppLaunchpadRouting.addSearchParams, { applaunchpad: 'rocks' });
    });
    it('Client can not read applaunchpad url parameter', () => {
      currentNode.clientPermissions.urlParameters.applaunchpad.read = false;
      assert.deepEqual(RoutingHelpers.prepareSearchParamsForClient(currentNode), {});
    });
    it('Client can not write applaunchpad url parameter', () => {
      currentNode.clientPermissions.urlParameters.applaunchpad.write = false;
      RoutingHelpers.addSearchParamsFromClient(currentNode, { applaunchpad: 'rocks', test: 'tets' });
      sinon.assert.calledWith(console.warn, 'No permission to add the search param "applaunchpad" to the url');
    });
    it('Client can only write specific url parameter', () => {
      currentNode.clientPermissions.urlParameters = {
        test: {
          write: true,
          read: true
        },
        applaunchpad: {
          write: false,
          read: false
        }
      };
      RoutingHelpers.addSearchParamsFromClient(currentNode, { applaunchpad: 'rocks', test: 'tets' });
      sinon.assert.calledWith(AppLaunchpadRouting.addSearchParams, { test: 'tets' });
      sinon.assert.calledWith(console.warn, 'No permission to add the search param "applaunchpad" to the url');
    });
  });

  describe('hasIntent', () => {
    it('checks against correct intent keyword', () => {
      const path = '#?intent=';
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isTrue(hasIntent);
    });

    it('check against incorrect intent keyword', () => {
      const path = '#?int=';
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isFalse(hasIntent);
    });

    it('check against undefined intent keyword', () => {
      const path = undefined;
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isFalse(hasIntent);
    });
  });

  describe('hasIntent', () => {
    it('checks against correct intent keyword', () => {
      const path = '#?intent=';
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isTrue(hasIntent);
    });

    it('check against incorrect intent keyword', () => {
      const path = '#?int=';
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isFalse(hasIntent);
    });

    it('check against undefined intent keyword', () => {
      const path = undefined;
      const hasIntent = RoutingHelpers.hasIntent(path);
      assert.isFalse(hasIntent);
    });
  });

  describe('getPageNotFoundRedirectResult', () => {
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });

    it('with custom pageNotFoundHandler defined redirectTo path', async () => {
      const customRedirect = 'somecustompath';
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.pageNotFoundHandler')
        .returns(() => {
          return { redirectTo: customRedirect };
        });
      const expected = await RoutingHelpers.getPageNotFoundRedirectResult('notFoundPath').path;
      assert.equal(customRedirect, expected);
    });

    it('with custom pageNotFoundHandler defined keepURL', async () => {
      const customKeepURL = true;
      const somePath = 'somePath';
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.pageNotFoundHandler')
        .returns(() => {
          return {
            redirectTo: somePath,
            keepURL: customKeepURL
          };
        });
      const expected = await RoutingHelpers.getPageNotFoundRedirectResult('');
      assert.deepEqual(
        {
          path: somePath,
          keepURL: customKeepURL
        },
        expected
      );
    });

    it('with custom pageNotFoundHandler not defined', async () => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.pageNotFoundHandler')
        .returns();
      const expected = await RoutingHelpers.getPageNotFoundRedirectResult('notFoundPath');
      assert.deepEqual({}, expected);
    });

    it('with custom pageNotFoundHandler not a function', async () => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.pageNotFoundHandler')
        .returns({ thisObject: 'should be function instead' });
      const expected = await RoutingHelpers.getPageNotFoundRedirectResult('notFoundPath').path;
      assert.equal(undefined, expected);
    });
  });

  describe('handlePageNotFoundAndRetrieveRedirectPath', () => {
    const component = {
      showAlert: () => {}
    };

    beforeEach(() => {
      console.warn = sinon.spy();
      sinon.stub(AppLaunchpadI18N, 'getTranslation');
      sinon.stub(RoutingHelpers, 'getPageNotFoundRedirectResult');
      sinon.stub(RoutingHelpers, 'showRouteNotFoundAlert');
      sinon.stub(component, 'showAlert');
    });

    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });

    it('when path exists should return path itself', async () => {
      const path = 'existingpath';
      const expected = await RoutingHelpers.handlePageNotFoundAndRetrieveRedirectPath(component, path, true);
      assert.equal(path, expected);
    });

    it('with custom pageNotFoundHandler defined', async () => {
      const redirectPath = { path: 'somepathtoredirect' };
      // define pageNotFoundHandler return value with stub
      RoutingHelpers.getPageNotFoundRedirectResult.returns(redirectPath);
      // call function being tested
      const expected = await RoutingHelpers.handlePageNotFoundAndRetrieveRedirectPath(component, redirectPath, false);
      assert.equal(redirectPath.path, expected);
    });

    it('with custom pageNotFoundHandler as not defined', async () => {
      const path = 'notFoundPath';
      AppLaunchpadI18N.getTranslation
        .withArgs('applaunchpad.requestedRouteNotFound', { route: path })
        .returns('Could not find the requested route');
      // set pageNotFoundHandler as undefined with stub
      RoutingHelpers.getPageNotFoundRedirectResult.returns({});
      // call function being tested
      const expected = await RoutingHelpers.handlePageNotFoundAndRetrieveRedirectPath(component, path, false);
      sinon.assert.calledWith(console.warn, `Could not find the requested route: ${path}`);
      sinon.assert.calledOnce(RoutingHelpers.showRouteNotFoundAlert);
      assert.equal(undefined, expected);
    });
  });

  describe('composeSearchParamsToRoute', () => {
    let globalLocationRef = global.location;
    const route = '/home';

    afterEach(() => {
      global.location = globalLocationRef;
    });

    it('with location search params', () => {
      global.location = {
        search: '?query=params'
      };
      const actual = RoutingHelpers.composeSearchParamsToRoute(route);
      const expected = '/home?query=params';

      assert.equal(actual, expected);
    });

    it('without location search params', () => {
      global.location = {
        search: ''
      };
      const actual = RoutingHelpers.composeSearchParamsToRoute(route);
      const expected = '/home';

      assert.equal(actual, expected);
    });
  });
  describe('modifySearchParams', () => {
    beforeEach(() => {
      sinon
        .stub(AppLaunchpadConfig, 'getConfigValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('modifySearchParams', () => {
      const searchParams = new URLSearchParams('mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'tets', applaunchpad: 'rocks', mario: undefined }, searchParams);
      assert.equal(searchParams.toString(), 'test=tets&applaunchpad=rocks');
    });
    it('modifySearchParams with paramPrefix', () => {
      const searchParams = new URLSearchParams('~mario=rocks');
      RoutingHelpers.modifySearchParams({ test: 'tets', applaunchpad: 'rocks' }, searchParams, '~');
      assert.equal(searchParams.toString(), '%7Emario=rocks&%7Etest=tets&%7Eapplaunchpad=rocks');
    });
  });

  describe('getURLWithoutModalData', () => {
    const modalParamName = 'mymodal';
    it('getURLWithoutModalData with additional search params', () => {
      let searchParamsString =
        '~test=tets&foo=bar&mymodal=%2Fsettings%2FhistoryMf&mymodalParams=%7B%22size%22%3A%22m%22%2C%22title%22%3A%22furz%22%7D';
      let urlWithoutModalData = RoutingHelpers.getURLWithoutModalData(searchParamsString, modalParamName);
      assert.equal(urlWithoutModalData, '%7Etest=tets&foo=bar');
    });
    it('getURLWithoutModalData with additional search params', () => {
      let searchParamsString =
        'mymodal=%2Fsettings%2FhistoryMf&mymodalParams=%7B%22size%22%3A%22m%22%2C%22title%22%3A%22furz%22%7D';
      let urlWithoutModalData = RoutingHelpers.getURLWithoutModalData(searchParamsString, modalParamName);
      assert.equal(urlWithoutModalData, '');
    });
  });
});
