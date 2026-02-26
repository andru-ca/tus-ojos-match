// src/blocks/InstagramFeed/Component.tsx
import React from 'react'
import { getInstagramData } from '@/lib/instagram'
import { InstagramFeedSlider } from './InstagramFeedSlider.client'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export interface InstagramFeedBlockProps {
  caption?: string | null
  titleSection?: DefaultTypedEditorState | null
  numberOfPosts?: number | null
  slidesPerView?: number | null
  showCaption?: boolean | null
}

export const InstagramFeedBlockComponent: React.FC<InstagramFeedBlockProps> = async ({
  caption,
  titleSection,
  numberOfPosts = 9,
  slidesPerView = 4,
  showCaption = false,
}) => {
  const { profile, posts } = await getInstagramData(numberOfPosts ?? 9)

  if (!posts || posts.length === 0) {
    return null
  }

  const slides = Math.min(Math.max(1, slidesPerView ?? 3), 6)

  return (
    <InstagramFeedSlider
      posts={posts}
      profile={profile}
      slidesPerView={slides}
      caption={caption}
      titleSection={titleSection}
      showCaption={showCaption ?? false}
    />
  )
}
