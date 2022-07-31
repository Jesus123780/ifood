import React from 'react'
import { UPLOAD_FILE } from './queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSetState } from 'hooks/useState'
import { InputFiles } from 'components/InputFilesPrev'

export const Dashboard = () => {
    const [uploadFileMultiple, { error: Error }] = useMutation(UPLOAD_FILE)
    const Files = useSetState('')
    const Reset = useSetState(false)
    
    const handleFileChange = async (e) => {
      const file = e.target.files[0]
      try {
        console.log(file)
        const res = await uploadFileMultiple({ variables: { file: file } })
        console.log(res)
      } catch (error) {
        console.log(error)
      }

        // Files.setState(paramFiles)
    }

    const handleSubmitFile = async () => {
        // e.stopPropagation()
        // e.preventDefault()
        for (let i = 0; i < Files.state.length; i++) {
          Reset.setState(true)
          try {
            const res = await uploadFileMultiple({ variables: { file: Files.state[i], input: { aSize: Files.state[i].size } } })
            Reset.setState(!Reset)
          } catch (error) {
          }
        }
      }
    return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <input type="file"  onChange={handleFileChange} />
            {/* <InputFiles Disable={null} onChange={handleFileChange} reset={Reset.state} /> */}
            <button onClick={() => handleSubmitFile()}>Subir</button>
        </div>
    )
}
