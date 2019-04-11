import React from 'react'
import { Card } from 'antd'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export default ({ post }) => (
  <Link to={post.fields.slug}>
    <Card
      hoverable
      cover={post.frontmatter.image && <PreviewCompatibleImage imageInfo={post.frontmatter.image} />}
    >
      <article>
        <Card.Meta
          title={post.frontmatter.title}
          description={post.excerpt}
        />
      </article>
    </Card>
  </Link>
)
