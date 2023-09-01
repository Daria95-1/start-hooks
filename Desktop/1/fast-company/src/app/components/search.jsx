import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { searchItem } from '../utils/searchItem'

const Search = ({ label, type, name, onSearchChange }) => {
  const [data, setData] = useState({ search: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    const searchText = target.value
    setData((prevState) => ({
      ...prevState,
      [target.name]: searchText,
    }))
  }

  const searchConfig = {
    search: {
      isName: {
        message: 'Такого имени не существует',
      },
      isLetter: {
        message: 'Совпадений не найдено',
      },
    },
  }

  useEffect(() => {
    const errors = searchItem(data, searchConfig)
    setErrors(errors)
    if (onSearchChange) {
      onSearchChange(data.search)
    }
  }, [data, onSearchChange])

  return (
    <div>
      <input
        className='w-100 mx-auto'
        type={type}
        id={name}
        name={name}
        value={data.search}
        placeholder={label}
        onChange={handleChange}
        error={errors.search}
      />
    </div>
  )
}

Search.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onSearchChange: PropTypes.func,
}

export default Search
