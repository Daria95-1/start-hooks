import React from 'react'
import PropTypes from 'prop-types'
import CollapseWrapper from '../common/collapse'

const ChildrenExercise = () => {
    const children = [
        <Component key={1} />,
        <Component key={2} />,
        <Component key={3} />
    ]

    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{' '}
                <code>React.Children.map</code> так и{' '}
                <code>React.Children.toArray</code>
            </p>

            {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, { index: index + 1 })
            })}
        </CollapseWrapper>
    )
}

const Component = ({ index }) => {
    return <div>{index} Компонент списка </div>
}

Component.propTypes = {
    index: PropTypes.number.isRequired
}

export default ChildrenExercise
