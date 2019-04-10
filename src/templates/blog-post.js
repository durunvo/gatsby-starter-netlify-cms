import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { DiscussionEmbed } from 'disqus-react'
import { Twitter, Facebook, Linkedin, Mail } from 'react-social-sharing'
import SEO from '../components/SEO';

export const BlogPostTemplate = ({
  post,
  contentComponent,
  helmet,
  latest,
  href,
}) => {
  const PostContent = contentComponent || Content
  const { id, title, tags, date, html, description, readingTime } = post

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{date} • {readingTime.text}</p>
            <PostContent content={html} />
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
            {href &&
              <>
                <h4>Share</h4>
                <div><Facebook link={href} /><Twitter link={href} /><Linkedin link={href} /><Mail link={href} /></div>
              </>
            }
            <h4>Author</h4>
            <p>PropaChill Team - We provide you accommodation in Bangkok, Follow us at <a href="https://www.facebook.com/propachill" target="_blank" rel="noopener noreferrer">PropaChill</a> if you want to be informed about new articles. We are open to any suggestions from you. Do not hesitate to tell me what you think.</p>
            <h4>Latest Posts</h4>
            <ul>
            {latest && latest.length &&
              latest.map(({ node: post }) => (
                <li key={post.id}>
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
            <DiscussionEmbed shortname="blog-propachill-com" config={{ identifier: id, title }} />
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
  post: PropTypes.shape({
    html: PropTypes.node.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  })
}

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post, allMarkdownRemark } = data

  const finalPost = {
    ...post,
    ...post.fields,
    ...post.frontmatter,
  }

  return (
    <Layout>
      <BlogPostTemplate
        post={finalPost}
        contentComponent={HTMLContent}
        helmet={
          <SEO
            isBlogPost={true}
            postData={finalPost}
            postImage={finalPost.image && finalPost.image.publicURL}
          />
        }
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
      fields {
        slug
        readingTime {
          text
        }
      }
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
