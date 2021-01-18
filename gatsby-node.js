/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions}) => {
  const { createPage } = actions

  // Only update the `/app` page
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";

    createPage(page);
  }
}