import React, { useEffect, useState, useMemo } from 'react'
import CardWrapper from '../../common/Card'
import Divider from '../../common/divider'
import SmallTitle from '../../common/typografy/smallTitle'

function factorial(n) {
    return n ? n * factorial(n - 1) : 1
}

function runFactorial(n) {
    console.log('run Factorial')
    return factorial(n)
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100)
    const [otherState, setOtherState] = useState(false)
    const buttonColor = otherState ? 'primary' : 'secondary'

    // показываем логику алгоритма поверхностной сверки
    // const buttonColor = useMemo(
    //     () => ({ value: otherState ? 'primary' : 'secondary' }),
    //     [otherState]
    // ) // в buttonColor указать buttonColor.value

    useEffect(() => {
        console.log('render button color')
    }, [buttonColor])

    const fact = useMemo(() => runFactorial(value), [value]) // первый параметр - функция, второй - зависимость
    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <Divider />
                <p>Value: {value}</p>
                <p>Result fact: {fact}</p>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState + 10)}
                >
                    Increment
                </button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState - 10)}
                >
                    Decrement
                </button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <Divider />
                <button
                    className={'btn ms-md-2 btn-' + buttonColor}
                    onClick={() => setOtherState((prevState) => !prevState)}
                >
                    Change Color
                </button>
            </CardWrapper>
        </>
    )
}

export default ComplexCalculateExample

// Мы используем мемоизацию только в тех случаях, если нам необходимо сохранить данные. Если нам необходимо сохранить обращение к функции, будем использовать use callback

// цвет кнопки меняется, но в данном случае мы запускаем выполнение нашей функции, для демонстрации создадим функцию runFactorial. Меняется цвет и runFactorial запускается. Как раз для этих случаев существует useMemo. Теперь в случае рендера runFactorial не запускается

// Таким образом мы можем кэшировать опр. типы данных. Например,сложные функции, или, если мы храним результат запроса к серверу не в состоянии, а в переменной (очень редко используется)

// В основном useMemo используется для хранения выполнения результата каких-либо сложнонагруженных функций. Это могут быть и просто данные (объекты, массивы), и react-компоненты
