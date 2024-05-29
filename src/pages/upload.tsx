import SingleFileUploader from "../components/upload/SingleFileUploader.tsx";
import MultipleFileUploader from "../components/upload/MultipleFileUploader.tsx";
import {CSSProperties} from "react";

const style: CSSProperties = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
}

const Upload = () => {
    return (
        <div style={style}>
            <h1>Загрузка файлов</h1>

            <h2>Вариант 1. Одиночная загрузка файлов</h2>
            <SingleFileUploader/>

            <h2>Вариант 2. Множественная загрузка файлов</h2>
            <MultipleFileUploader/>
        </div>
    )
}

export default Upload;

