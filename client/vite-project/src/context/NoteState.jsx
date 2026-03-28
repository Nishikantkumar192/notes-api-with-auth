import NoteContext from "./NoteContext"

const NoteState = (props) => {
  return (
    <div>
      <NoteContext.Provider value={values}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
