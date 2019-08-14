import CustomComponent from './CustomComponent/CustomComponent'

const rendererFunc = (block, onChange, getDeletedImages, setReadOnly, isAdmin) => {
    if (block.getType() === 'atomic') {
        return {
            component: CustomComponent,
            editable: false,
            props: {
                onChange: onChange,
                isAdmin: isAdmin ? true : false,
                getDeletedImages: getDeletedImages,
                setReadOnly: setReadOnly
            },  
        }
    }
    return undefined
}

export default rendererFunc;