import React, { useRef } from 'react'
import CollapseWrapper from '../common/collapse'

const UseRefExercise = () => {
    // Доступ к DOM элементу
    const blocRef = useRef(null)

    const handleClickSizeAndText = () => {
        // Если блок существует
        if (blocRef.current) {
            blocRef.current.textContent = 'text'
            blocRef.current.style.width = '150px'
            blocRef.current.style.height = '80px'
            blocRef.current.style.border = '1px solid #000'
        }
        console.log('Изменения')
    }

    return (
        <>
            <div ref={blocRef}>
                <CollapseWrapper title="Упражнение">
                    <p className="mt-3">
                        У вас есть блок, у которого заданы ширина и высота.
                        Добавьте кнопку, при нажатии которой изменятся следующие
                        свойства:
                    </p>
                    <ul>
                        <li>Изменится содержимое блока на &quot;text&quot;</li>
                        <li>
                            высота и ширина станут равны 150 и 80 соответственно
                        </li>
                    </ul>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleClickSizeAndText}
                    >
                        Button
                    </button>
                </CollapseWrapper>
            </div>
        </>
    )
}

export default UseRefExercise
