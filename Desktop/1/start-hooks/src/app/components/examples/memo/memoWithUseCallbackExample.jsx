import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const LogOutButton = ({ onLogOut }) => {
    useEffect(() => {
        console.log('render button') // отображаем при каждом рендере
    })
    return (
        <bitton className="btn btn-primary mx-3" onClick={onLogOut}>
            LogOut
        </bitton>
    )
}

LogOutButton.propTypes = {
    onLogOut: PropTypes.func
}

function areEqual(prevState, nextState) {
    if (prevState.onLogOut !== nextState.onLogOut) {
        return false
    }
    return true
}

// добавляем memo
// useMemo по поверхностной сверки понимает, что handleLogOut равна предыдущей. Потому что useCallback хранит в себе функцию и тем самым дает нам шанс сравнить функцию, чтобы они были равны. У useMemo есть вторая часть. Эта функция называется Equal
const MemoizedLogOutButton = React.memo(
    LogOutButton,
    areEqual
    // (prevProps, nextProps) => {
    //     if (prevProps === nextProps) return true
    //     return false
    // }
    // вместо этой функции просто передаем areEqual
)

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false)
    // const handleLogOut = () => {
    //     localStorage.removeItem('auth')
    // }
    const handleLogOut = useCallback(() => {
        // useCallback хранит в себе функцию
        localStorage.removeItem('auth')
    }, [props])

    return (
        <>
            <bitton
                className="btn btn-primary"
                onClick={() => setState(!state)}
            >
                initiate rerender
            </bitton>
            {/* <LogOutButton onLogOut={handleLogOut} /> */}
            <MemoizedLogOutButton onLogOut={handleLogOut} />
        </>
    )
}

export default MemoWithUseCallbackExample

// С помощью React.memo можно оптимизировать количество ререндеров целого компонента.
