import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import './style.less'

interface Iprops {
  id: string;
  style: React.StyleHTMLAttributes<any>;
  options: any;
  events: any;
}

export interface AmapHandles {
  loadAMapPromise: Promise<boolean>;
}

function Map (props: Iprops, ref?: React.Ref<AmapHandles>) {
  const { id } = props

  const style = props.style ? props.style : {
    width: '100%',
    height: '400px',
  }

  let loadAMapPromise = Promise.resolve(true)

  const loadAMapSDK = (key: string, callback: (amap: any) => void) => {
    if ((window as any).AMap) {
      callback((window as any).AMap)
    } else {
      loadAMapPromise = new Promise((resolve) => {
        const load = () => {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `//webapi.amap.com/maps?v=1.3&key=${key}&callback=__amap_init_callback`
          document.body.appendChild(script);
          // eslint-disable-next-line
          (window as any).__amap_init_callback = () => {
            callback((window as any).AMap);
            // eslint-disable-next-line
            (window as any).__amap_init_callback = null
            resolve(true)
          }
        }
        load()
      })
    }
  }

  useEffect(() => {
    const { id, options, events } = props
    loadAMapSDK('a5ebc730f80db3b1375a691afad00942', (AMap) => {
      const map = new AMap.Map(id, options)
      map.clearMap()
      events && Object.keys(events).map((event) => map.on(event, events[event]))
    })
  }, [])

  useImperativeHandle(ref, () => ({
    loadAMapPromise,
  }))

  return (
    <div id={id} style={style} />
  )
}

export default forwardRef(Map)
