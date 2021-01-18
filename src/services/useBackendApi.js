import { useStaticQuery, graphql } from 'gatsby';

// Returns url of backend api
export default function useBackendApi() {
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            backendApi
          }
        }
      }
    `
  );
  
  return query.site.siteMetadata.backendApi;
}