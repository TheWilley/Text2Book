import { useEffect, useState } from 'react';
import loader from '../assets/loader.svg';
import FileUploadSingle from './FileUploadSingle';

function Form(props: { callback: (text: string, author: string, title: string, rawOutput: boolean) => void }) {
    // Normal states
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [useFileUpload, setUseFileUpload] = useState(false);
    const [rawOutput, setRawOutput] = useState(false);

    // Handle the submit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('sdfsdg');
        const run = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLoading(false);
            props.callback(text, author, title, rawOutput);
        };
        void run();
        setLoading(true);
    };

    // Decides if load icon should be shown
    const getButtonTitle = () => {
        if (loading) {
            return (
                <div className='flex justify-center text-white'>
                    <img className="h-5 w-5 mr-3" src={loader} />
                </div>
            );
        } else {
            return 'Generate';
        }
    };

    const handleChangeText = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        setText(target.value);

        localStorage.setItem('text', target.value);
    };

    const handleChanngeAuthor = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        setAuthor(target.value);

        localStorage.setItem('author', target.value);
    };

    const handleChangeTitle = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        setTitle(target.value);

        localStorage.setItem('title', target.value);
    };

    useEffect(() => {
        setText(localStorage.getItem('text') || '');
        setAuthor(localStorage.getItem('author') || '');
        setTitle(localStorage.getItem('title') || '');
    }, []);

    return (
        <>
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2">
                <div>
                    <input type="radio" name="input_method" id="use-text-input" className="peer hidden" onChange={() => setUseFileUpload(false)} checked={!useFileUpload} />
                    <label htmlFor="use-text-input" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition">Use Text Input</label>
                </div>
                <div>
                    <input type="radio" name="input_method" id="use-file-upload" className="peer hidden" onChange={() => setUseFileUpload(true)} checked={useFileUpload} />
                    <label htmlFor="use-file-upload" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition">Use File Input</label>
                </div>
            </div>
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2 mt-2">
                <div>
                    <input type="radio" name="generation_method" id="command-output" className="peer hidden" onChange={() => setRawOutput(false)} checked={!rawOutput} />
                    <label htmlFor="command-output" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition">Generate Commands</label>
                </div>
                <div>
                    <input type="radio" name="generation_method" id="raw-output" className="peer hidden" onChange={() => setRawOutput(true)} checked={rawOutput} />
                    <label htmlFor="raw-output" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition">Generate Text</label>
                </div>
            </div>
            <hr className='mb-4 mt-4' />
            <form
                onSubmit={handleSubmit}
            >
                <div className="flex flex-wrap mb-4">
                    <div className="w-full sm:w-1/2 px-2">
                        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            placeholder='Lewis Carroll'
                            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                            value={author}
                            onChange={handleChanngeAuthor}
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className="w-full sm:w-1/2 px-2">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder='Alice in Wonderland'
                            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                            value={title}
                            onChange={handleChangeTitle}
                            maxLength={15}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                        Text
                    </label>
                    <div>
                        <div className={`${!useFileUpload ? 'hidden' : ''}`}>
                            <FileUploadSingle callback={(text) => setText(text)} useFileUpload={useFileUpload} />
                        </div>
                        <div className={`${useFileUpload ? 'hidden' : ''}`}>
                            <textarea
                                id="text"
                                placeholder='Once upon a time, there was a girl...'
                                className="w-full h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 h-32 resize-none"
                                value={text}
                                onChange={handleChangeText}
                                required={!useFileUpload}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {getButtonTitle()}
                </button>
            </form>
        </>
    );
}

export default Form;