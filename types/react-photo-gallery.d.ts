import React from 'react'

/**
 * Photos array item properties (passed into Gallery's photos property)
 */
export interface PhotoProps {
  /**
   * the img src attribute value of the image
   */
  src: string
  /**
   * srcSet attribute of the image
   */
  srcSet?: string | string[]
  /**
   * sizes attribute of the image
   */
  sizes?: string | string[]
  /**
   *  original width of the gallery image (only used for calculating aspect ratio)
   */
  width: number
  /**
   *  original height of the gallery image (only used for calculating aspect ratio)
   */
  height: number
  /**
   *  alt text of the gallery image
   */
  alt?: string
  /**
   * key to be used on component
   * @default
   * src
   */
  key?: string
}

/**
 * If you're passing a function component to ImageComponent you will receive back these props:
 */
export interface ImageComponentProps {
  /**
   * margin prop optionally passed into Gallery by user
   */
  margin?: string
  /**
   * the index of the photo within the Gallery
   */
  index: number
  /**
   * the individual object passed into Gallery's
   * photos array prop, with all the same props except recalculated height and width
   */
  photo: PhotoProps
}

export interface GalleryProps {
  photos: PhotoProps[]
  /**
   * number of photos per row or a function which receives the container width
   * and should return the desired number of photos per row; defaults to Gallery's breakpoint choosing
   */
  columns?: number | ((containerWidth: number) => number)
  /**
   * do something when the user clicks a photo;
   * receives arguments event and an object containing the index,
   * photo obj originally sent and the next and previous photos in the gallery if they exist
   */
  onClick?: (
    event: React.MouseEvent,
    photos: {
      index: number
      next: PhotoProps | null
      photo: PhotoProps
      previous: PhotoProps | null
    }
  ) => void

  /**
   * number of margin pixels around each entire image
   * @default 2
   */
  margin?: number
  /**
   * column or row based layout
   * @default'row'
   */
  direction?: string

  ImageComponent?: React.ComponentType<ImageComponentProps>
}

declare const Gallery: React.ComponentClass<GalleryProps>

export default Gallery

