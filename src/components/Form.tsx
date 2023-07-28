import { useEffect, useState } from 'react';
import loader from '../assets/loader.svg';
import FileUploadSingle from './FileUploadSingle';

function Form(props: { callback: (text: string, author: string, title: string) => void }) {
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
        const run = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLoading(false);
            props.callback(text, author, title);
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
            <div className="flex flex-col items-center">
                <div className="border rounded-md p-4 mb-4">
                    <div className="mb-4 flex items-center">
                        <input id="use-file-upload" type="checkbox" className="mr-2 leading-tight h-4 w-4" onChange={() => setUseFileUpload(!useFileUpload)} />
                        <label htmlFor="use-file-upload" className="text-gray-700">
                            Use file upload
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input id="raw-output" type="checkbox" className="mr-2 leading-tight p-2 h-4 w-4" onChange={() => setRawOutput(!rawOutput)} />
                        <label htmlFor="raw-output" className="text-gray-700">
                            Generate raw text
                        </label>
                    </div>
                </div>
            </div>
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
                        {useFileUpload ? <FileUploadSingle callback={(text) => setText(text)} /> :
                            <textarea
                                id="text"
                                placeholder='Once upon a time, there was a girl...'
                                className="w-full h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 h-32 resize-none"
                                value={text}
                                onChange={handleChangeText}
                                required
                            />
                        }
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