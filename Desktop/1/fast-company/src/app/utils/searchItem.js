export function searchItem(data, config) {
  const errors = {}

  function search(searchMethod, data, config) {
    let statusSearch
    switch (searchMethod) {
      case 'isName': {
        const nameRegExp = /^[А-ЯЁ][а-яё]*$/
        statusSearch = !nameRegExp.test(data)
        break
      }

      case 'isLetter': {
        const letterRegExp = /^[a-zA-ZА-ЯЁа-яё]+$/
        statusSearch = !letterRegExp.test(data)
        break
      }

      default:
        break
    }
    if (statusSearch)
      console.log('Search failed for', searchMethod, 'with data:', data)
    return config.message
  }

  for (const fieldName in data) {
    for (const searchMethod in config[fieldName]) {
      const error = search(
        searchMethod,
        data[fieldName],
        config[fieldName][searchMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}

export function searchUsers(searchText, users, selectedProfession) {
  const searchTerm = searchText.toLowerCase().trim()

  const filteredUsers = users.filter((user) => {
    const userName = user.name.toLowerCase()
    const userProfession = user.profession.name.toLowerCase()

    return (
      (userName.includes(searchTerm) || userName === searchTerm) &&
      (!selectedProfession || userProfession === selectedProfession)
    )
  })

  return filteredUsers
}
