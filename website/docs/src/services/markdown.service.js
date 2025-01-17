import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import format from 'rehype-format';
import html from 'rehype-stringify';
import addIdsToHeadings from 'rehype-slug';
import frontmatter from 'remark-frontmatter';

import applaunchpadLinkParser from '../unified-plugins/rehype-applaunchpad-linkparser';
import addCopyToClipboard from '../unified-plugins/rehype-copy-to-clipboard';
import addCustomAttributes from '../unified-plugins/rehype-add-custom-attributes';
import wrapAccordion from '../unified-plugins/rehype-accordion';
import applaunchpadNavigationBuilder from '../unified-plugins/remark-generate-applaunchpad-navigation';
import addKeyWords from '../unified-plugins/rehype-add-keywords';
import oldVersions from '../unified-plugins/rehype-applaunchpad-oldVersions';

// import highlight from 'rehype-highlight' // syntax highlight code blocks with lowlight: https://github.com/wooorm/lowlight
import rehypeSection from '@agentofuser/rehype-section';
const section = rehypeSection.default;

class MarkdownService {
  async process(value, data = {}) {
    return new Promise((resolve, reject) => {
      unified()
        .use(markdown)
        .use(frontmatter, { type: 'json', fence: { open: '<!-- meta', close: 'meta -->' } })
        // .use(logger)
        .use(applaunchpadNavigationBuilder, data)
        .use(remark2rehype, { allowDangerousHTML: true })
        .use(raw)
        .use(addCustomAttributes)
        .use(wrapAccordion, { questionTagName: 'h3' })
        .use(applaunchpadLinkParser, data)
        .use(addIdsToHeadings)
        .use(addCopyToClipboard)
        .use(addKeyWords)
        .use(oldVersions)
        .use(section) // section should be the last one
        .use(format)
        .use(html)
        .process(String(value), function(err, file) {
          if (err) {
            console.error(err || file);
            return reject();
          }
          resolve(file.contents);
        });
    });

    function logger() {
      return console.dir;
    }
  }
}

export const MarkdownSvc = new MarkdownService();
