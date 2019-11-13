import React, { useState, ReactNode, useImperativeHandle, forwardRef } from 'react'
import { Upload, Icon, Alert, List, message } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload/interface'
import { fetchFormData } from 'utils/fetchApi'

export interface UploadExcelProps {
  disabled?: boolean;
  maxLength?: number;
  uploadText?: string | ReactNode;
  maxSize?: number;
  url: string;
  // true auto upload when file validate success, default false;
  flashUpload?: boolean;
  onChange?: (fileList: UploadFile[]) => void | PromiseLike<void>;
}

interface ErrorProps {
  index: number;
  message: string;
}

export interface UploadExcelHandles {
  handleUpload(): void;
  getFileList(): UploadFile[];
}

function UploadExcel(props: UploadExcelProps, ref?: React.Ref<UploadExcelHandles>): JSX.Element {
  const { disabled, maxLength, uploadText, maxSize, url, flashUpload } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [errorList, setErrorList] = useState<ErrorProps[]>([])

  async function handleUpload() {
    setErrorList([])
    const formData = new FormData()
    fileList.forEach((file: any) => {
      formData.append('files[]', file.originFileObj)
    })
    const result = await fetchFormData(url, formData)
    if (result.errorList && result.errorList.length) {
      setErrorList(result.errorList)
    } else {
      message.success('上传成功！')
    }
  }

  function getFileList(): UploadFile[] {
    return fileList
  }

  // export handleUpload function to custorm upload
  useImperativeHandle(ref, () => ({
    handleUpload,
    getFileList,
  }))

  function handleBeforeUpload(file: RcFile): boolean {
    if (maxSize && maxSize < file.size) {
      message.error('文件大小超过限制，请重新上传！')
    } else if (!file.name.includes('.xlsx')) {
      message.error('请上传excel格式的文件！')
    } else {
      setFileList([...fileList, file])
    }
    return !!flashUpload
  }

  function handleChange({ file, fileList }: { file: UploadFile; fileList: UploadFile[]}) {
    setFileList(fileList)
    if (file.status === 'done' && flashUpload) {
      handleUpload()
    }
  }

  const uploadButton = (
    <div>
      <Icon type="upload" />
      {uploadText || '上传文件'}
    </div>
  )

  return (
    <div>
      <Upload
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        // onRemove={handleRemove}
        onChange={handleChange}
      >
        {disabled || (maxLength && fileList.length >= maxLength) ? null : uploadButton}
      </Upload>
      <div className="error-message">
        <Alert
          type="error"
          message={<span style={{ color: 'red' }} key="gateway error">导入失败，请检查文件</span>}
          banner
        />
        <Alert
          key="dfa"
          type="error"
          message={
            (
              <List
                itemLayout="horizontal"
                dataSource={errorList}
                renderItem={(item) => (
                  <List.Item title={`第${item.index + 1}行，${item.message}`} />
                )}
              />
            )
          }
          showIcon={false}
          banner
        />
      </div>
    </div>
  )
}

export default forwardRef(UploadExcel)
