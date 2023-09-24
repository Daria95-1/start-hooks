import React, { useRef, useState, useEffect, useCallback } from 'react'
import CardWrapper from '../../common/Card'
import Divider from '../../common/divider'
import SmallTitle from '../../common/typografy/smallTitle'

const UseCallBackExample = () => {
    const [data, setData] = useState({})

    // считаем кол-во рендаров validateWithOutCallback
    const withOutCallback = useRef(0)
    // считаем кол-во рендаров validateWithCallback
    const withCallback = useRef(0)

    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    // Without Callback
    const validateWithOutCallback = (data) => {
        console.log(data)
    }
    useEffect(() => {
        withOutCallback.current++
    }, [validateWithOutCallback])

    // With Callback
    const validateWithCallback = useCallback((data) => {
        console.log(data)
    }, [])
    useEffect(() => {
        withCallback.current++
    }, [validateWithCallback])

    // необходимо вызывать нашу функцию каждый раз при каждом изменении data
    useEffect(() => {
        validateWithOutCallback(data)
        validateWithCallback(data)
    }, [data])

    return (
        <CardWrapper>
            <SmallTitle>Example</SmallTitle>
            <Divider />
            <p>Render withoutCallback: {withOutCallback.current} </p>
            <p>Render withCallback: {withCallback.current} </p>
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                value={data.email || ''}
                name="email"
                onChange={handleChange}
            />
        </CardWrapper>
    )
}

export default UseCallBackExample

// С помощью useCallback можно предотвращать ненужные рендендеры дочерних компонентов, которым мы передаем callback функцию

// Это нужно, чтобы при обновлении компонента не нужно было ререндарить саму функцию. Если передаем функцию в виде зависимости в useEffect(если используем внутри, а задаем не внутри), нам нужно, чтобы useEffect не вызывал ререндеринг лишний раз, когда функция не обновляется, но ему показалось, что она обновилась

// useCallback позволяет сравнивать предыдущее и следующее состояния и говорить о том, что они равны, потому что в случае JS у нас все является ссылочным. Когда мы проверяем ссылки, они разнятся. В случае useCallback это будет одинаково. Для чего это нужно? Если мы добавляем в useEffect функцию в зависимости, то мы получаем бесконечный рендер без useCallback

// useCallback(fn, deps) ~ useMemo(() => fn, deps)

// Отличие от useMemo: useCallback хранит внутри целую функцию, а useMemo - результат функции. И того: в useCallback мы храним функции, а в useMemo - данные.

// Это может показаться одним и тем же. НО! Когда нужно сохранить именно функцию, которую передаем дочернему элементу, мы передаем ее в зависимости, и нам необходимо, чтобы на всех рендерах она была одна и та же, мы используем useCallback. А если нам нужен один и тот же результат на протяжении нескольких ререндеров, если у нас зависимость совпадает, мы используем useMemo

// Какждый из этих хуков забирает ресурсы на поверхностную сверку и при каждом ререндере этот хук выполняется, хоть мы и не видим результата этого хука.
