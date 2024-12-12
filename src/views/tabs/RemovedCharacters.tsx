function RemovedCharacters(props: { removedCharacters: string[] }) {
  return (
    <div>
      <div className='text-center text-gray-500 mb-2'>
        The following characters were removed due to being incompatible
      </div>
      <ul className='bg-white rounded-lg border border-gray-200 flex gap-2 justify-center flex-wrap p-3'>
        {props.removedCharacters.length ? (
          props.removedCharacters.map((character, index) => (
            <li key={index}>{character}</li>
          ))
        ) : (
          <li key={0}>No characters were removed</li>
        )}
      </ul>
    </div>
  );
}

export default RemovedCharacters;
