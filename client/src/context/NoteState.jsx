import NoteContext from './NoteContext'

const NoteState = (props) => {
    const values={
        
    }
  return (
    <div>
      <NoteContext.Provider value={values}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
