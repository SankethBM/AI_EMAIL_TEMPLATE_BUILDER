import React from 'react'

function SocialIconComponent({style, imageUrl, outerStyle }) {
  return (
    <div style={outerStyle}>
        <img src={imageUrl} alt="SocialIcon" style={style} />
    </div>
  )
}

export default SocialIconComponent