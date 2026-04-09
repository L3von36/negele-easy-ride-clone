import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useMeta() {
  const route = useRoute()

  const setMeta = (title, description) => {
    if (title) {
      document.title = `${title} | Negele Easy Ride`
      
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', title)
      
      const twitterTitle = document.querySelector('meta[property="twitter:title"]')
      if (twitterTitle) twitterTitle.setAttribute('content', title)
    }
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) metaDescription.setAttribute('content', description)
      
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) ogDescription.setAttribute('content', description)
      
      const twitterDescription = document.querySelector('meta[property="twitter:description"]')
      if (twitterDescription) twitterDescription.setAttribute('content', description)
    }
  }

  // You can call this from individual components
  return { setMeta }
}
