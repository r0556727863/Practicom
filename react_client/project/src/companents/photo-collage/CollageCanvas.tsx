"use client"

import type React from "react"
import { useEffect } from "react"
import { Box } from "@mui/material"
import type { CollageLayout } from "./CollageMaker"
import { collageStyles } from "../../styles/collage.styles"

interface CollageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement|null>
  imageRef: React.RefObject<HTMLImageElement | null>
  layout: CollageLayout
  borderWidth: number
  borderColor: string
  backgroundColor: string
  polaroidText: string
  onPreviewUpdate: (url: string) => void
}

// קומפוננטת הקנבס והרינדור - 50 שורות (הלוגיקה נשארת זהה)
const CollageCanvas: React.FC<CollageCanvasProps> = ({
  canvasRef,
  imageRef,
  layout,
  borderWidth,
  borderColor,
  backgroundColor,
  polaroidText,
  onPreviewUpdate,
}) => {
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      renderCollage()
    }
  }, [imageRef])

  useEffect(() => {
    if (imageRef.current) {
      renderCollage()
    }
  }, [layout, borderWidth, borderColor, backgroundColor, polaroidText])

  const renderCollage = () => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current
    const canvasWidth = 400
    const canvasHeight = 400

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // ניקוי הקנבס
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // רקע רק אם לא שקוף
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }

    const imgRatio = img.width / img.height

    const drawImageMaintainAspect = (x: number, y: number, width: number, height: number) => {
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      if (width / height > imgRatio) {
        drawWidth = height * imgRatio
        offsetX = (width - drawWidth) / 2
      } else {
        drawHeight = width / imgRatio
        offsetY = (height - drawHeight) / 2
      }

      ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight)
    }

    const drawBorder = (x: number, y: number, width: number, height: number) => {
      if (borderWidth > 0) {
        ctx.fillStyle = borderColor
        ctx.fillRect(x - borderWidth, y - borderWidth, width + borderWidth * 2, height + borderWidth * 2)
      }
    }

    const drawHeart = (x: number, y: number, width: number, height: number) => {
      ctx.save()
      ctx.beginPath()

      const topCurveHeight = height * 0.3

      ctx.moveTo(x + width / 2, y + height)
      ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

      ctx.closePath()
      ctx.clip()

      drawImageMaintainAspect(x, y, width, height)
      ctx.restore()
    }

    const drawCircle = (x: number, y: number, radius: number) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      drawImageMaintainAspect(x, y, radius * 2, radius * 2)
      ctx.restore()
    }

    const drawStar = (x: number, y: number, width: number, height: number) => {
      ctx.save()
      ctx.beginPath()

      const centerX = x + width / 2
      const centerY = y + height / 2
      const outerRadius = Math.min(width, height) / 2
      const innerRadius = outerRadius / 2.5
      const spikes = 5

      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes

      ctx.moveTo(centerX, centerY - outerRadius)

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
        rot += step
      }

      ctx.lineTo(centerX, centerY - outerRadius)
      ctx.closePath()
      ctx.clip()

      drawImageMaintainAspect(x, y, width, height)
      ctx.restore()
    }

    switch (layout) {
      case "original":
        const availableSpace = Math.min(canvasWidth, canvasHeight) - borderWidth * 2
        const originalX = borderWidth
        const originalY = borderWidth

        drawBorder(originalX, originalY, availableSpace, availableSpace)
        drawImageMaintainAspect(originalX, originalY, availableSpace, availableSpace)
        break

      case "split2":
        const totalWidth = canvasWidth - borderWidth * 3
        const totalHeight = canvasHeight - borderWidth * 2
        const splitWidth = totalWidth / 2
        const splitHeight = totalHeight
        const splitY = borderWidth
        const leftX = borderWidth
        const rightX = borderWidth * 2 + splitWidth

        drawBorder(leftX, splitY, splitWidth, splitHeight)
        drawImageMaintainAspect(leftX, splitY, splitWidth, splitHeight)

        drawBorder(rightX, splitY, splitWidth, splitHeight)
        drawImageMaintainAspect(rightX, splitY, splitWidth, splitHeight)
        break

      case "split4":
        const quarterTotalSize = Math.min(canvasWidth, canvasHeight) - borderWidth * 3
        const quarterSize = quarterTotalSize / 2
        const margin = borderWidth

        drawBorder(margin, margin, quarterSize, quarterSize)
        drawImageMaintainAspect(margin, margin, quarterSize, quarterSize)

        const topRightX = margin * 2 + quarterSize
        drawBorder(topRightX, margin, quarterSize, quarterSize)
        drawImageMaintainAspect(topRightX, margin, quarterSize, quarterSize)

        const bottomLeftY = margin * 2 + quarterSize
        drawBorder(margin, bottomLeftY, quarterSize, quarterSize)
        drawImageMaintainAspect(margin, bottomLeftY, quarterSize, quarterSize)

        drawBorder(topRightX, bottomLeftY, quarterSize, quarterSize)
        drawImageMaintainAspect(topRightX, bottomLeftY, quarterSize, quarterSize)
        break

      case "polaroid":
        const polaroidWidth = canvasWidth * 0.7
        const polaroidHeight = polaroidWidth * 1.2
        const polaroidX = (canvasWidth - polaroidWidth) / 2
        const polaroidY = (canvasHeight - polaroidHeight) / 2
        const frameWidth = 20
        const bottomFrame = 60

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)

        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)
        ctx.shadowColor = "transparent"

        const polaroidImgWidth = polaroidWidth - frameWidth * 2
        const polaroidImgHeight = polaroidHeight - frameWidth - bottomFrame
        drawImageMaintainAspect(polaroidX + frameWidth, polaroidY + frameWidth, polaroidImgWidth, polaroidImgHeight)

        ctx.font = "20px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(polaroidText, polaroidX + polaroidWidth / 2, polaroidY + polaroidHeight - 15)
        break

      case "frame":
        const frameAvailableSpace = Math.min(canvasWidth, canvasHeight) - borderWidth * 2
        const frameX = borderWidth
        const frameY = borderWidth

        drawBorder(frameX, frameY, frameAvailableSpace, frameAvailableSpace)
        drawImageMaintainAspect(frameX, frameY, frameAvailableSpace, frameAvailableSpace)
        break

      case "heart":
        const heartAvailableSpace = Math.min(canvasWidth, canvasHeight) - borderWidth * 2
        const heartX = borderWidth
        const heartY = borderWidth

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.beginPath()

          const x = heartX - borderWidth
          const y = heartY - borderWidth
          const width = heartAvailableSpace + borderWidth * 2
          const height = heartAvailableSpace + borderWidth * 2
          const topCurveHeight = height * 0.3

          ctx.moveTo(x + width / 2, y + height)
          ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
          ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

          ctx.closePath()
          ctx.fill()
        }

        drawHeart(heartX, heartY, heartAvailableSpace, heartAvailableSpace)
        break

      case "circle":
        const circleAvailableSpace = Math.min(canvasWidth, canvasHeight) - borderWidth * 2
        const circleX = borderWidth
        const circleY = borderWidth
        const radius = circleAvailableSpace / 2

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.beginPath()
          ctx.arc(circleX + radius, circleY + radius, radius + borderWidth, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        }

        drawCircle(circleX, circleY, radius)
        break

      case "star":
        const starAvailableSpace = Math.min(canvasWidth, canvasHeight) - borderWidth * 2
        const starX = borderWidth
        const starY = borderWidth

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor

          const centerX = canvasWidth / 2
          const centerY = canvasHeight / 2
          const outerRadius = starAvailableSpace / 2 + borderWidth
          const innerRadius = outerRadius / 2.5
          const spikes = 5

          ctx.beginPath()
          let rot = (Math.PI / 2) * 3
          const step = Math.PI / spikes

          ctx.moveTo(centerX, centerY - outerRadius)

          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
            rot += step
            ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
            rot += step
          }

          ctx.lineTo(centerX, centerY - outerRadius)
          ctx.closePath()
          ctx.fill()
        }

        drawStar(starX, starY, starAvailableSpace, starAvailableSpace)
        break
    }

    onPreviewUpdate(canvas.toDataURL("image/jpeg"))
  }

  return (
    <Box sx={collageStyles.canvasContainer}>
      <canvas ref={canvasRef} style={collageStyles.canvas} />
    </Box>
  )
}

export default CollageCanvas
