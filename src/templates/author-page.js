import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import SEO from '../components/SEO';

export const AuthorPageTemplate = ({
  id,
  name,
  description,
  image,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

AuthorPageTemplate.propTypes = {
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
  content: PropTypes.node.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const AuthorPage = ({ data, location }) => {
  const { markdownRemark: author } = data

  return (
    <Layout>
      <AuthorPageTemplate
        name={author.frontmatter.name}
        description={author.frontmatter.description}
        image={author.frontmatter.image}
        content={author.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

AuthorPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default AuthorPage

export const pageQuery = graphql`
  query AuthorByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
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
`
