import React, { useEffect, useState } from 'react'
import Measure from 'react-measure'
import { Descriptions } from 'antd'

interface Iprops {
  children: React.ReactNode;
}


function MeasureWrapper (props: Iprops) {
  const [dimensions, setDimensions] = useState({ width: -1, height: -1 })
  const [column, setColumn] = useState(2)

  useEffect(() => {
    const { width } = dimensions
    let column = 2
    if (width >= 1008) {
      column = 3
    } else if (width >= 518) {
      column = 2
    } else if (width > 0) {
      column = 1
    }
    setColumn(column)
  }, [dimensions.width])

  return (
    <Measure
      bounds
      onResize={(contentRect: any) => {
        setDimensions(contentRect.bounds)
      }}
    >
      {
        ({ measureRef }) => (
          <div ref={measureRef}>
            <Descriptions title="User Info" column={column}>
              {props.children}
            </Descriptions>
          </div>
        )
      }
    </Measure>
  )
}

MeasureWrapper.Item = Descriptions.Item

export default MeasureWrapper
