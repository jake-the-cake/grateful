import React from 'react'
import { BuildFormProps, useBuildForm } from '../hooks/UseBuildForm'

export const CustomForm = ({ data, errors }: { data: BuildFormProps[], errors: any }) => {
  const elements = useBuildForm( data, errors )

  return (
    <div className='form__container'>
      { elements && elements.map( e => e )}
    </div>
  )
}