import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { DiscussionEmbed } from 'disqus-react'
import { Twitter, Facebook, Linkedin, Mail } from 'react-social-sharing'
import { Row, Col, Icon, List, Avatar } from 'antd'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO';

export const BlogPostTemplate = ({
  isPreview,
  id,
  title,
  description,
  tags,
  readingTime,
  date,
  content,
  contentComponent,
  helmet,
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
            <p>{date} • {readingTime}</p>
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
            {href &&
              <>
                <h4>Sharing is Caring <Icon type="heart" theme="twoTone" twoToneColor="red" /></h4>
                <div style={{ marginBottom: 16 }}><Facebook link={href} /><Twitter link={href} /><Linkedin link={href} /><Mail link={href} /></div>
              </>
            }
            {
              !isPreview && (
                <>
                  <h4>Author</h4>
                  <List.Item style={{ marginBottom: 16, maxWidth: 500 }}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      description={<p>We provide you accommodation in Bangkok, Follow us at <a href="https://www.facebook.com/propachill" target="_blank" rel="noopener noreferrer">PropaChill</a> if you want to be informed about new articles. We are open to any suggestions from you. Do not hesitate to tell me what you think.</p>}
                    />
                  </List.Item>
                  <h4>Our Latest Posts</h4>
                  <Row type="flex" gutter={12}>
                  {latest && latest.length &&
                    latest.map(({ node: post }) => (
                      <Col xs={24} sm={12} key={post.id} style={{ marginBottom: 12 }}>
                        <BlogCard post={post}/>
                      </Col>
                    ))
                  }
                  </Row>
                  <DiscussionEmbed shortname="blog-propachill-com" config={{ identifier: id, title }} />
                </>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
  content: PropTypes.node.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  readingTime: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post, allMarkdownRemark } = data

  return (
    <Layout>
      <BlogPostTemplate
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        date={`${post.frontmatter.date}`}
        image={post.frontmatter.image}
        tags={post.frontmatter.tags}
        readingTime={post.fields.readingTime.text}
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <SEO
            isBlogPost={true}
            postData={Object.assign({}, post, post.fields, post.frontmatter)}
            postImage={post.frontmatter.image && post.frontmatter.image.publicURL}
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
      limit: 4
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { id: { ne: $id }, frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
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
