import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { DiscussionEmbed } from 'disqus-react'
import { Twitter, Facebook, Linkedin, Mail } from 'react-social-sharing'

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
  latest,
  href,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{date}</p>
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
            <h4>Share</h4>
            <p><Facebook link={href} /><Twitter link={href} /><Linkedin link={href} /><Mail link={href} /></p>
            <h4>Author</h4>
            <p>PropaChill Team - We provide you accommodation in Bangkok, Follow us at <a href="https://www.facebook.com/propachill" target="_blank" rel="noopener noreferrer">PropaChill</a> if you want to be informed about new articles. We are open to any suggestions from you. Do not hesitate to tell me what you think.</p>
            <h4>Latest Posts</h4>
            <ul>
            {latest &&
              latest.map(({ node: post }) => (
                <li>
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <p>
                    {post.excerpt}
                  </p>
                </li>
              ))
            }
            </ul>
            <DiscussionEmbed shortname="blog-propachill-com" config={{ identifier: id, title: title }} />
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
  const { markdownRemark: post, allMarkdownRemark } = data
  console.log(location);
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
            <meta property="og:url" content={location.href} />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:image" content={post.frontmatter.image ? post.frontmatter.image.publicURL : '/img/og-image.png'} />
          </Helmet>
        }
        id={post.id}
        date={post.frontmatter.date}
        image={post.frontmatter.image}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        latest={allMarkdownRemark.edges}
        href={location.href}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
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
    allMarkdownRemark(
      limit: 6
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { id: { ne: $id }, frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
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
