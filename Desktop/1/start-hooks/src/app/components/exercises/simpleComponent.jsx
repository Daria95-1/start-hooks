import React from 'react'
import PropTypes from 'prop-types'

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    return (
        <div>
            {isAuth ? (
                <button className="btn btn-danger mx-3" onClick={onLogOut}>
                    Выйти из системы
                </button>
            ) : (
                <button className="btn btn-primary mx-3" onClick={onLogin}>
                    Войти
                </button>
            )}
        </div>
    )
}

SimpleComponent.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired
}

export default SimpleComponent
