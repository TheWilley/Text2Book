import { IFormSettings } from '../../global/types.ts';
import MultiChoice from '../../components/MultiChoice.tsx';
import Hint from '../../components/Hint.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faFileImport,
  faFileExport,
  faFileLines,
  faComment,
  faTerminal,
  faCube,
  faCalendarPlus,
  faCalendarMinus,
  faPerson,
  faCubes,
} from '@fortawesome/free-solid-svg-icons';
import { faJava } from '@fortawesome/free-brands-svg-icons';

function FormSettings(props: IFormSettings) {
  return (
    <>
      <MultiChoice
        name='input-method'
        items={[
          {
            id: 'use-text-input',
            label: (
              <>
                <FontAwesomeIcon icon={faPenToSquare} /> Text Input
              </>
            ),
            checked: props.inputFormat === 'text',
            callback: () => props.setInputFormat('text'),
          },
          {
            id: 'use-file-input',
            label: (
              <>
                <FontAwesomeIcon icon={faFileImport} /> File Input
              </>
            ),
            checked: props.inputFormat === 'file',
            callback: () => props.setInputFormat('file'),
          },
        ]}
      />
      <div className='mb-2' />
      <MultiChoice
        name='output-method'
        items={[
          {
            id: 'use-text-output',
            label: (
              <>
                <FontAwesomeIcon icon={faFileLines} /> Text Output
              </>
            ),
            checked: props.outputFormat === 'text',
            callback: () => props.setOutputFormat('text'),
          },
          {
            id: 'use-file-output',
            label: (
              <>
                <FontAwesomeIcon icon={faFileExport} /> File Output
              </>
            ),
            checked: props.outputFormat === 'file',
            callback: () => props.setOutputFormat('file'),
          },
        ]}
      />
      <div className='mb-2' />
      <MultiChoice
        name='generation_method'
        items={[
          {
            id: 'use-text-generation',
            label: (
              <>
                <FontAwesomeIcon icon={faComment} /> Generate Text
              </>
            ),
            checked: props.generationFormat === 'text',
            callback: () => props.setGenerationFormat('text'),
          },
          {
            id: 'use-command-generation',
            label: (
              <>
                <FontAwesomeIcon icon={faTerminal} /> Generate Commands
              </>
            ),
            checked: props.generationFormat === 'commands',
            callback: () => props.setGenerationFormat('commands'),
          },
        ]}
      />
      {props.generationFormat === 'commands' && (
        <>
          <div className='mb-2' />
          <Hint
            text='If a Player or Command Block runs the command. A Player has a 256-character limit, while a Command Block is larger at 32,500 characters.'
            padding={-7}
          >
            <MultiChoice
              name='command-target'
              items={[
                {
                  id: 'player',
                  label: (
                    <>
                      <FontAwesomeIcon icon={faPerson} /> Player Executable
                    </>
                  ),
                  checked: props.commandTarget === 'player',
                  callback: () => props.setCommandTarget('player'),
                },
                {
                  id: 'commandblock',
                  label: (
                    <>
                      <FontAwesomeIcon icon={faCubes} /> Command Block Executable
                    </>
                  ),
                  checked: props.commandTarget === 'commandblock',
                  callback: () => props.setCommandTarget('commandblock'),
                },
              ]}
            />
          </Hint>
          <div className='mb-2' />
          <MultiChoice
            name='minecraft-version'
            items={[
              {
                id: 'bedrock',
                label: (
                  <>
                    <FontAwesomeIcon icon={faCube} /> Bedrock Version
                  </>
                ),
                checked: props.minecraftVersion === 'bedrock',
                callback: () => props.setMinecraftVersion('bedrock'),
              },
              {
                id: 'java',
                label: (
                  <>
                    <FontAwesomeIcon icon={faJava} /> Java Version
                  </>
                ),
                checked: props.minecraftVersion === 'java',
                callback: () => props.setMinecraftVersion('java'),
              },
            ]}
          />
          {props.minecraftVersion === 'java' && (
            <Hint
              text='Minecraft changed its syntax for several commands in 1.20.5. If you are using a older version, pick the old syntax.'
              padding={-7}
            >
              <div className='mb-2' />
              <MultiChoice
                name='java-version'
                items={[
                  {
                    id: '1205',
                    label: (
                      <>
                        <FontAwesomeIcon icon={faCalendarPlus} /> New Syntax ({'>'}1.20.5)
                      </>
                    ),
                    checked: props.javaVersion === '1.20.5',
                    callback: () => props.setJavaVersion('1.20.5'),
                  },
                  {
                    id: '1204',
                    label: (
                      <>
                        <FontAwesomeIcon icon={faCalendarMinus} /> Old Syntax ({'<'}
                        1.20.4)
                      </>
                    ),
                    checked: props.javaVersion === '1.20.4',
                    callback: () => props.setJavaVersion('1.20.4'),
                  },
                ]}
              />
            </Hint>
          )}
        </>
      )}
    </>
  );
}

export default FormSettings;
