import React, { useEffect, useState } from 'react'
import CardWrapper from '../../common/Card'
import Divider from '../../common/divider'
import SmallTitle from '../../common/typografy/smallTitle'
import TextField from '../../common/form/textField'
import PropTypes from 'prop-types'

const FormComponent = ({ children }) => {
    const [data, setData] = useState({}) // передаем не сам объект, а экземпляр объекта, т.е. тот объект, который задан в коде с опр. параметрами, а не тот, который получаем через импорт

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    return React.Children.map(children, (child) => {
        // Чтобы добавлять параметры, необходимо клонировать элементы
        const config = {
            ...child.props,
            onChange: handleChange,
            value: data[child.props.name] || ''
        } // получаем предыдущие пропертис

        return React.cloneElement(child, config)
    })
}

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

const ReactChildrenExample = () => {
    return (
        <CardWrapper>
            <SmallTitle>Clone form and add props</SmallTitle>
            <Divider />
            <FormComponent>
                <TextField name="email" label="email" />
                <TextField name="password" label="Пароль" type="password" />
            </FormComponent>
        </CardWrapper>
    )
}

export default ReactChildrenExample

// С помощью React.Children можно использовать полезные функции для работы с props.children
