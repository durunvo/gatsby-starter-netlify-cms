import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { DiscussionEmbed } from 'disqus-react'

export const BlogPostTemplate = ({
  id,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  image,
}) => {
  const PostContent = contentComponent || Content
  const disqusShortname = "blog-propachill-com";
  const disqusConfig = {
    identifier: id,
    title: title,
  };

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>Published on {date} by Admin</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
}

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s - PropaChill Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <link rel="canonical" href="/" />
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta
              image={post.frontmatter.image ? post.frontmatter.image.publicURL : '/img/og-image.png'}
            />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={location.pathname} />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:image" content={post.frontmatter.image ? post.frontmatter.image.publicURL : '/img/og-image.png'} />
          </Helmet>
        }
        id={post.id}
        date={post.frontmatter.date}
        image={post.frontmatter.image}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
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
