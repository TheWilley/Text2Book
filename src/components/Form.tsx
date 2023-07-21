import { useState } from 'react';
import loader from '../assets/loader.svg';

function Form(props: { callback: (text: string, author: string, title: string) => void }) {
    // Normal states
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

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

    return (
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
                        onChange={(e) => setAuthor(e.target.value)}
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
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={15}
                        required
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                    Text
                </label>
                <textarea
                    id="text"
                    placeholder='Once upon a time, there was a girl...'
                    className="w-full h-72 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 h-32 resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {getButtonTitle()}
            </button>
        </form>
    );
}

export default Form;