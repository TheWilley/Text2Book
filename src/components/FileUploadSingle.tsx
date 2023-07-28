import { ChangeEvent, useState } from 'react';

function FileUploadSingle(props: { callback: (text: string) => void, useFileUpload: boolean }) {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);

        // If file type is text/plain
        if (file?.type === 'text/plain') {
            // Read the file
            const reader = new FileReader();
            reader.readAsText(file);

            // Set the file name
            setFileName(file.name);

            // Set the text
            reader.onload = () => {
                props.callback(reader.result as string);
            };
        }
    };

    return (
        <div>
            <div className="relative mb-3">
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept='.txt'
                    className="opacity-0 absolute z-0 w-full h-full"
                    required={props.useFileUpload}
                />
                <div className="bg-white rounded-md border border-gray-400 px-4 py-2 flex items-center justify-between">
                    <span className="text-gray-700">{fileName || 'Choose a file'}</span>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
                    >
                        Browse
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileUploadSingle;
