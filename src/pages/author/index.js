import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const AuthorsPage = ({
  data: {
    site: {
      siteMetadata: {
        title
      }
    },
    allMarkdownRemark: {
      edges: posts
    }
  }
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Authors | ${'as'}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Authors</h1>
            <ul className="taglist">
              {
                posts.map(author => (
                  <li key={author.node.id}>
                    <Link to={author.node.fields.slug}>
                      {author.node.frontmatter.name}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

AuthorsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default AuthorsPage

export const authorPageQuery = graphql`
  query AuthorsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name] }
      filter: { frontmatter: { templateKey: { eq: "author-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            templateKey
            description
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
