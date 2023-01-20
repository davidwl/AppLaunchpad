<!-- meta
{
  "node": {
    "label": "FAQ",
    "category": {
      "label": "Basics",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 2
    }
  }
}
meta -->

# Frequently asked questions about AppLaunchpad

<!-- add-attribute:class:success -->
>**TIP:** You can go to our [GitHub Discussions page](https://github.com/davidwl/applaunchpad/discussions) to find the answers to more questions not listed here.

This page contains FAQs about AppLaunchpad in the following categories:
- [Basics](#basic-questions)
- [User interface/appearance](#ui-questions)
- [Navigation and routing](#navigation-and-routing-questions)
- [Others](#other-questions)

## Basic questions

<!-- accordion:start -->

### What is AppLaunchpad?

AppLaunchpad is a micro frontend framework that helps you build modularizable, extensible, scalable and consistent UIs and web applications (for administrators and business users).

You can watch this video of a AppLaunchpad use case to understand its functions better:
<iframe width="560" height="315" src="https://www.youtube.com/embed/fRYESd-YDhA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### What are micro frontends?

The term "micro frontends" extends the concepts of micro services to the frontend. It's an architectural style where big frontend monoliths are decomposed into smaller and simpler chunks to be developed, tested, deployed and maintained independently and rapidly (by many distributed teams), while still appearing to the customer as a one cohesive product.

This video which explains the basics of micro frontend architecture and how it can be implemented with AppLaunchpad:
<iframe width="560" height="315" src="https://www.youtube.com/embed/Bjp1_yvtR4Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Does AppLaunchpad deliver micro frontends?

No, AppLaunchpad itself does not deliver any micro frontends. It is a framework that helps you develop micro frontends and connect them to web applications.

### Is AppLaunchpad only useful in the context of SAP or very large corporate applications?

No, AppLaunchpad can be used independently of SAP for a variety of purposes. You can find one example in [this article](https://medium.com/swlh/applaunchpad-micro-fronteds-orchestrator-8c0eca710151) which describes how to create a small hobby project using AppLaunchpad.

### What is the difference between AppLaunchpad and SAPUI5/OpenUI5?

You can find a detailed response to this question [here](https://github.com/davidwl/applaunchpad/discussions/2809#discussioncomment-3137780).

### Where can I download AppLaunchpad?

The AppLaunchpad project can be found on [GitHub](https://github.com/davidwl/applaunchpad). Depending on the UI framework you use, there are different setups for AppLaunchpad. You can find more information here: [application setup](application-setup.md).

### Does AppLaunchpad provide micro frontend to micro frontend communication?

Yes. The simplest way to configure this type of communication is unidirectional via [linkmanager.navigate](applaunchpad-client-api.md#linkmanager) where you can send additional data to the target micro frontend via [withParams](applaunchpad-client-api.md#withparams).

Another possibility is to call [linkmanager.navigate](applaunchpad-client-api.md#linkmanager) with the [preserveView](applaunchpad-client-api.md#navigate) option set to `true`. This allows you to get a "return value" from the target micro frontend if it uses the [goBack](applaunchpad-client-api.md#goback) function. Lastly, you can use custom events to model your own communication functionality.

Of course, AppLaunchpad also allows you to communicate between the core application (AppLaunchpad Core) and the micro frontend (AppLaunchpad Client). See [custom messages](communication.md) for more info.

### The distributed development possibilities seem like a big advantage; is that just an additional benefit from using AppLaunchpad, or was that a main factor behind it?

Development scalability was one of the main goals right from the beginning. There is a nice article on [martinfowler.com](https://martinfowler.com/articles/micro-frontends.html) explaining the benefits of a micro frontend architecture in general. All the disadvantages of the iframe approach mentioned in the article are solved with AppLaunchpad.

### One of the potential issues with a micro frontend architecture is styling. You suggest to use the CSS elements of Fundamentals to solve that issue. Is that correct?

It is crucial that all micro frontends in a solution follow the same design guidelines. AppLaunchpad's default UI styling is based on [Fundamentals](https://sap.github.io/fundamental-styles/) but it can be customised. If you don’t want to use Fundamentals, but Bootstrap, Material, or something else instead, you need to re-style the AppLaunchpad view components according to your design guidelines or replace them with your own components completely.

### AppLaunchpad claims to be ‘technology agnostic’. Are you referring to the UI framework that can be used, or to some other technology?

The main point is that you can choose any base frontend technology you prefer, such as UI5, Angular, React, or Vue. You can even mix them in one solution. One micro frontend can use UI5, while another is written in Angular and Fundamentals. The only thing that matters is that HTML/JavaScript/CSS resources are provided and served via HTTPS in the end. The fact that a micro frontend is its own web application also means that you have full freedom regarding your development toolchain and CI/CD solutions, and the web server you want to use (such as Nginx, Apache, Tomcat, or Github Pages).

Last but not least, "technology agnostic" also means that there are no conflicts regarding any additional libraries you use, such as D3.js, Chart.js, or others. You can also avoid conflicts between different versions of the same library. Imagine a monolithic web application where a lot of teams are contributing and there has been a decision that Chart.js is the data visualization framework of choice, and then there is a need for updating the version, which potentially has breaking changes. In that case, all the teams have to be approached and asked if they use it, if their code is affected by the version update and, if so, when they can deliver the necessary changes. With AppLaunchpad, you don‘t have this management overhead at all.

### Are there any equivalents of AppLaunchpad?

Yes, there are several. Here are some of the most popular: [Mosaic](https://www.mosaic9.org/), [Single-spa](https://github.com/CanopyTax/single-spa), [OpenComponents](https://opencomponents.github.io/), [Piral](https://www.piral.io). Note that they are not 100% equivalents of AppLaunchpad!

<!--
### In what way is AppLaunchpad different from these mentioned framework/products?

TBD
-->

### Is AppLaunchpad already being used within any products, or is it still too new?

Yes, it is already being used in production and close-to-production within SAP. For example in Kyma, SAP C/4HANA Cockpit, Context Driven Services, Konduit and Varkes. Outside of SAP, SAAS AG (partner) uses AppLaunchpad. Additionally, there are some POCs going on and we're supporting a few other customers and partners who want to start using AppLaunchpad soon.

<!-- accordion:end -->

## UI questions

<!-- accordion:start -->

### I don't want to use the default Fiori Fundamentals style. How can I style AppLaunchpad differently? How can I change the look of AppLaunchpad's UI?

There are a few options to do that at the moment:
- Use the Fundamental Styles theming capabilities which already allow you to achieve a lot by customizing the CSS variables. Find more info [here](https://github.com/SAP/theming-base-content).
- Manually overwrite the styles where needed. The documentation page you are on right now can be used as an example, as it was developed with AppLaunchpad.
- Turn off AppLaunchpad view components completely via the [hideNavigation](general-settings.md#hidenavigation) parameter in the `settings:` section of your AppLaunchpad configuration. Then you can implement your own view components for header and navigation and use the [AppLaunchpad Core API](applaunchpad-core-api.md) to set them up with AppLaunchpad.
- You can use this simple example with a completely customized shell as a starting point:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>AppLaunchpad Custom UI</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@applaunchpad-project/core/applaunchpad.css"
    />
    <script src="https://unpkg.com/@applaunchpad-project/core/applaunchpad.js"></script>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    />
  </head>
​
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
​
    <!-- CUSTOM APP LOGIC, Vanilla JS navigation implementation example -->
    <script>
      /**
       * entry function for custom app logic
       */
      function init() {
        // react on route changes
        window.onhashchange = updateNav; // there will be an abstraction on applaunchpad side in the future, independend from routing strategy

        // building up static root nodes in header
        window.linkEl = document.querySelector(".links");
        AppLaunchpad.getConfigValueAsync("navigation.nodes").then((data) => {
          data.forEach((element) => {
            var anc = document.createElement("a");
            anc.innerHTML = AppLaunchpad.i18n().getTranslation(element.label);
            anc.pathSegment = element.pathSegment;
            anc.addEventListener("click", () => {
              AppLaunchpad.navigation().navigate("/" + element.pathSegment);
            });
            linkEl.appendChild(anc);
          });
          updateNav();
        });
      }
​
      /**
       * returns the currently selected branch in the navigation tree as an array, starting from root to leaf
       * (currently this has to be done manually here, but we plan to expose that as part of applaunchpad core api)
       */
      function getNodeBranch() {
        let nodeTree = AppLaunchpad.getConfigValue("navigation.nodes");
        let segments = window.location.hash.split("/");
        console.log(segments);
        let nodes = [];
        let cnodes = nodeTree;
        segments?.forEach((seg) => {
          cnodes.forEach((node) => {
            if (node.pathSegment === seg) {
              cnodes = node.children;
              nodes.push(node);
            }
          });
        });
        console.log(nodes);
        return nodes;
      }
​
      /**
       * renders side navigation nodes
       */
      function renderNavNodes(container, nodes, parentPath, nodeBranch) {
        nodes?.forEach((node) => {
          let nodeCnt = document.createElement("div");
          nodeCnt.classList.add("myNode");
          let label = document.createElement("div");
          label.classList.add("myNodeLabel");
          if (nodeBranch?.length === 1 && node === nodeBranch[0]) {
            label.classList.add("selected");
          }
          label.innerHTML = node.label;
​
          // possible targets
          let path = node.link || parentPath + "/" + node.pathSegment;
          let extLink = node.externalLink;
​
          label.onclick = (ev) => {
            if (extLink) {
              if (extLink.sameWindow) {
                window.location.href = extLink.url;
              } else {
                window.open(extLink.url, "_blank");
              }
            } else {
              console.log("nav to ", path);
              AppLaunchpad.navigation().navigate(path);
            }
          };
          nodeCnt.appendChild(label);
          if (node.children) {
            renderNavNodes(nodeCnt, node.children, path, nodeBranch.slice(1));
          }
​
          container.appendChild(nodeCnt);
        });
      }
​
      /*
       * updates navigation view state according to currently selected node
       */
      function updateNav() {
        let nodeBranch = getNodeBranch();
​
        if (nodeBranch?.length > 0) {
          // top nav selection
          linkEl.querySelectorAll("a").forEach((el) => {
            el.classList.toggle(
              "selected",
              el.pathSegment === nodeBranch[0].pathSegment
            );
          });
​
          // left nav content
          let sideNavCnt = document.querySelector(".myLeftSideNav");
          sideNavCnt.innerHTML = "";
​
          renderNavNodes(
            sideNavCnt,
            nodeBranch[0].children,
            "/" + nodeBranch[0].pathSegment,
            nodeBranch.slice(1)
          );
​
          document.body.classList.toggle(
            "leftNavHidden",
            !(nodeBranch[0].children?.length > 0) || !!nodeBranch[0].hideSideNav
          );
        }
      }
    </script>
​
    <!-- CUSTOM APP LOGIC -->
​
    <!-- CUSTOM STYLES -->
    <style>
      .myHeader {
        height: 50px;
        background: linear-gradient(
          90deg,
          rgba(60, 69, 83, 1) 26%,
          rgba(42, 183, 113, 1) 100%
        );
        padding: 10px;
        font-size: large;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        font-weight: bold;
        position: relative;
      }
​
      .myHeader img {
        height: 32px;
      }
​
      .myHeader > span {
        vertical-align: top;
        margin-top: 4px;
        display: inline-block;
        margin-left: 10px;
      }
​
      .myHeader .links {
        position: absolute;
        right: 20px;
        bottom: 0;
      }
​
      .myHeader .links a,
      .myHeader .links a:visited {
        color: white;
        margin: 5px;
        padding: 5px;
        text-decoration: none;
        border: 1px solid white;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #2ab771;
      }
​
      .myHeader .links a.selected {
        color: #2ab771;
        background: white;
      }
​
      html.applaunchpad-app-in-custom-container [applaunchpad-app-root] {
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 260px;
        right: 0;
      }
​
      .leftNavHidden .myLeftSideNav {
        display: none;
      }
​
      html.applaunchpad-app-in-custom-container .leftNavHidden [applaunchpad-app-root] {
        left: 0;
      }
​
      .myLeftSideNav {
        position: absolute;
        overflow-y: auto;
        top: 50px;
        bottom: 0;
        left: 0;
        width: 259px;
        background-color: rgba(60, 69, 83, 1);
        color: white;
        border-top: 1px solid #2ab771;
      }
​
      .myNode {
        margin: 15px;
      }
​
      .myNodeLabel {
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
      }
​
      .myNodeLabel:hover {
        color: #2ab771;
      }
​
      .myNodeLabel.selected {
        font-weight: bold;
        color: #2ab771;
      }
    </style>
    <!-- CUSTOM STYLES -->
​
    <!-- LUIGI CONFIG -->
    <script>
      AppLaunchpad.setConfig({
        navigation: {
          nodes: [
            {
              pathSegment: "home",
              label: "Home",
              hideFromNav: true,
              children: [
                {
                  pathSegment: "overview",
                  label: "Overview",
                  icon: "home",
                  viewUrl:
                    "https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html",
                  context: {
                    title: "Welcome to AppLaunchpad Fiddle!",
                    content:
                      'Click on "Modify Config" at the bottom right and play around with your AppLaunchpad configuration',
                  },
                  children: [
                    {
                      pathSegment: "l1",
                      label: "L1",
                      icon: "home",
                      viewUrl:
                        "https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html",
                      context: {
                        title: "L1",
                        content: "",
                      },
                      children: [
                        {
                          pathSegment: "l2",
                          label: "L2",
                          icon: "home",
                          viewUrl:
                            "https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html",
                          context: {
                            title: "L2",
                            content: "",
                          },
                        },
                        {
                          pathSegment: "empty",
                          label: "Empty Page L2",
                          category: {
                            label: "Fundamental Demo Pages",
                            icon: "dimension",
                            collapsible: true,
                          },
                          loadingIndicator: {
                            enabled: false,
                          },
                          viewUrl:
                            "https://fiddle.applaunchpad-project.io/examples/microfrontends/fundamental/empty-demo-page.html",
                        },
                      ],
                    },
                    {
                      pathSegment: "empty",
                      label: "Empty Page L1",
                      category: {
                        label: "Fundamental Demo Pages",
                        icon: "dimension",
                        collapsible: true,
                      },
                      loadingIndicator: {
                        enabled: false,
                      },
                      viewUrl:
                        "https://fiddle.applaunchpad-project.io/examples/microfrontends/fundamental/empty-demo-page.html",
                    },
                  ],
                },
                {
                  pathSegment: "empty",
                  label: "Empty Page",
                  category: {
                    label: "Fundamental Demo Pages",
                    icon: "dimension",
                    collapsible: true,
                  },
                  loadingIndicator: {
                    enabled: false,
                  },
                  viewUrl:
                    "https://fiddle.applaunchpad-project.io/examples/microfrontends/fundamental/empty-demo-page.html",
                },
                {
                  pathSegment: "table",
                  label: "Table",
                  category: "Fundamental Demo Pages",
                  loadingIndicator: {
                    enabled: false,
                  },
                  viewUrl:
                    "https://fiddle.applaunchpad-project.io/examples/microfrontends/fundamental/table-demo-page.html",
                },
                {
                  pathSegment: "tree",
                  label: "Tree",
                  category: "Fundamental Demo Pages",
                  loadingIndicator: {
                    enabled: false,
                  },
                  viewUrl:
                    "https://fiddle.applaunchpad-project.io/examples/microfrontends/fundamental/tree-demo-page.html",
                },
                {
                  pathSegment: "ui5qs",
                  label: "Quickstart",
                  category: {
                    label: "UI5 Demo Pages",
                    icon: "sap-ui5",
                    collapsible: true,
                  },
                  viewUrl:
                    "https://fiddle.applaunchpad-project.io/examples/microfrontends/ui5qs/",
                },
                {
                  pathSegment: "ui5sc",
                  label: "Shopping Cart",
                  category: "UI5 Demo Pages",
                  hideSideNav: true,
                  loadingIndicator: {
                    enabled: false,
                  },
                  viewUrl:
                    "https://sapui5.netweaver.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
                },
              ],
            },
            {
              pathSegment: "foo",
              label: "Some Action",
              icon: "favorite-list",
              viewUrl:
                "https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html",
              hideSideNav: true,
              context: {
                title: "Left navigation hidden",
                content:
                  "for pages needing more space or wanting to handle navigation internally",
              },
            },
            {
              pathSegment: "help",
              label: "Help",
              icon: "sys-help",
              viewUrl:
                "https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html",
              context: {
                title: "Help Section",
                content: "Find some useful links on the left",
              },
              children: [
                {
                  label: "Back",
                  link: "/",
                  icon: "nav-back",
                },
                {
                  label: "AppLaunchpad Github Page",
                  externalLink: {
                    url: "https://github.com/davidwl/applaunchpad",
                  },
                },
                {
                  label: "Fundamental Library",
                  externalLink: {
                    url: "https://sap.github.io/fundamental-styles",
                  },
                },
                {
                  label: "Fundamental Icons",
                  externalLink: {
                    url:
                      "https://sap.github.io/fundamental-styles/components/icon.html",
                  },
                },
              ],
            },
          ],
        },
​
        routing: {
          useHashRouting: true,
        },
        settings: {
          hideNavigation: true /* IMPORTANT, hides applaunchpad shell */,
        },
        lifecycleHooks: {
          applaunchpadAfterInit: () => {
            init(); /* IMPORTANT, calls init from custom app logic */
          },
        },
      });
    </script>
​
    <!-- LUIGI CONFIG -->
​
    <!-- HTML -->
​
    <div class="myHeader">
      <img src="https://fiddle.applaunchpad-project.io/img/applaunchpad.png" />
      <span>ACME Corp</span>
      <div class="links"></div>
    </div>
​
    <div class="myLeftSideNav"></div>
​
    <div applaunchpad-app-root></div>
    <!-- IMPORTANT -->
​
    <!-- HTML -->
  </body>
</html>
```

### How do I disable the AppLaunchpad loading indicator? / My micro frontend page is stuck on a loading screen.

If you include micro frontends in AppLaunchpad which don't use AppLaunchpad Client, AppLaunchpad Core won't know when they are ready because there is no handshake. This can cause the page to remain loading indefinitely. In that case, you should disable the loading indicator using the [loadingIndicator.enabled](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=loadingindicatorenabled) parameter in your configuration file.

### Can I hide the AppLaunchpad default side/top navigation panel?

To hide AppLaunchpad side navigation, use the [hideSideNav](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=hidesidenav) parameter.

To hide the top navigation, you can use custom CSS, for example:

```css
.fd-shellbar {
    display: none;
}
.fd-app__sidebar, .iframeContainer  {
    top: 0;
}
```

### Can I have more than 2 levels in the AppLaunchpad side navigation?/Can navigation nodes have grandchildren?

Curerntly, it is not possible for AppLaunchpad navigation nodes to have more than one level of children. However, the [tab navigation](https://docs.applaunchpad-project.io/docs/navigation-advanced?section=tab-navigation) can be used to place additional nodes on the page.

<!-- accordion:end -->

## Navigation and routing questions

<!-- accordion:start -->

### What is the proper way for AppLaunchpad Core to react to navigation from AppLaunchpad Client?

You can use the [nodeChangeHook](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=nodechangehook) function to react to navigation inside AppLaunchpad Core.

### How can I deactivate AppLaunchpad routing?

You can do that by using the [skipRoutingForUrlPatterns](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=skiproutingforurlpatterns) parameter and setting it to `*`.

<!-- accordion:end -->

## Other questions

<!-- accordion:start -->

### Is it possible to have more than one micro frontend on the same page?

Yes, currently this is possible via [splitView](https://docs.applaunchpad-project.io/docs/applaunchpad-client-api/?section=splitview) or [Web Components](https://docs.applaunchpad-project.io/docs/web-component).

### Can I place a micro frontend within another micro frontend?

Yes, AppLaunchpad's [Web Component](https://docs.applaunchpad-project.io/docs/web-component) feature allows you to create [compound micro frontends](https://docs.applaunchpad-project.io/docs/navigation-parameters-reference/?section=webcomponent).

### How can I implement a custom home page or login page for AppLaunchpad?

One way would be to bind the AppLaunchpad app root to a specific [dom element](https://docs.applaunchpad-project.io/docs/applaunchpad-ux-features?section=rendering-of-applaunchpad-application-in-the-dom). With a second dom element containing your home page views, you could control visibility of the two based on login status. For example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Hello AppLaunchpad</title>
    <link rel='stylesheet' href='https://unpkg.com/@applaunchpad-project/core@1.7.0/applaunchpad.css'>
    <script src='https://unpkg.com/@applaunchpad-project/core@1.7.0/applaunchpad.js'></script>
    <meta charset="utf-8">
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <style>
        html, body {
            height: 100%;
        }
        .homepage-container {
            text-align: center;
            display: none;
            width: 100%;
            height: 100%;
        }
        .applaunchpad-container {
            width: 100%;
            height: 100%;
        }
        .homepage .homepage-container {
            display: block;
        }
        .homepage .applaunchpad-container {
            display: none;
        }
    </style>
    <div class="homepage-container">
        <h1>HOMEPAGE</h1>
        <button onclick="window.loggedIn=true; checkLogin()">Login</button>
    </div>
    <div class="applaunchpad-container" applaunchpad-app-root></div>
    <script>
        function checkLogin() {
            document.body.classList.toggle('homepage', !window.loggedIn);
        }
        checkLogin();
        AppLaunchpad.setConfig({
        navigation: {
            nodes: [{
                pathSegment: 'home',
                label: 'h',
                hideFromNav: true,
                children: [{
                    pathSegment: 'overview',
                    label: 'Overview',
                    icon: 'home',
                    viewUrl: 'https://fiddle.applaunchpad-project.io/examples/microfrontends/multipurpose.html',
                    context: {
                        title: 'Welcome to AppLaunchpad Fiddle!',
                        content: 'Click on "Modify Config" at the bottom right and play around with your AppLaunchpad configuration'
                    }
                }]
            }]
        },
        routing: {
            useHashRouting: true
        },
        settings: {
            responsiveNavigation: 'semiCollapsible',
            header: {
                title: 'AppLaunchpad Example'
            }
        }
    });
    </script>
</body>
</html>
```

### Where can I find the source code for AppLaunchpad Fiddle?

AppLaunchpad is an open-source project. You can find the source code on our [GitHub repository](https://github.com/davidwl/applaunchpad/tree/master/website/fiddle).

<!-- accordion:end -->
