import { ErrorMessage, Field } from 'formik';
import Dropzone from "react-dropzone";
import TextError from './TextError';
import Thumbnail from './Thumbnail';
export default function Dropzones(props) {
	const { label, name, className, icon, setFieldValue, values, ...rest } = props;
	return (
		<div className={`${className}`}>
			<label htmlFor={name}>{label}</label>
            <Dropzone 
            className="flex rounded border-2 bg-white focus-within:border-greenBtn" 
            accept="image/*" 
            onDrop={(acceptedFiles) => {
                if (acceptedFiles.length === 0) { return; }
                    setFieldValue("avatar", values.files.concat(acceptedFiles));
                }}>
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                    return "This file is authorized";
                    }

                    if (isDragReject) {
                    return "This file is not authorized";
                    }

                    if (values.files.length === 0) { 
                    return <p>Try dragging a file here!</p>
                    }

                    return values.files.map((file, i) => (
                    <Thumbnail key={i} file={file} />
                    ));
                }}
                </Dropzone>
				<input
					id={name}
                    type="file"
					name={name}
					className="py-4 px-6 w-full outline-none border-none "
					{...rest}
				/>
				{icon && (
					<div className="mr-4 text-greenBtn flex justify-center items-center cursor-pointer">
						{icon}
					</div>
				)}
			<ErrorMessage
				name={name}
				component={TextError}
			/>
		</div>
	);
}
