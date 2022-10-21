import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import {
  Header, Box, Card, Flex, Form, TextField, Button,
  Paragraph, Text,
} from 'grape-ui-react';
import styled, { css } from 'styled-components';
import useAudio from '../../hooks/use-audio';
import AppContext from '../../app-context';
import localization from '../../assets/localization.json';
import { ReactComponent as WaterGlass } from '../../assets/waterglass.svg';

const CustomTextField = styled(TextField)`
  max-width: 45px;
  
`;
const CustomForm = styled(Form)`
 div {
  max-width: 45px;
 }
 `;
const CustomButton = styled(Button)`
  cursor: pointer;
`;
const ErrorCard = styled(Card)`
 border-color: #DB5AA8;
`;

const YAY_SOUND_URL = `${process.env.PUBLIC_URL}/yay-6326.mp3`;
const AWW_SOUND_URL = `${process.env.PUBLIC_URL}/aww-8277.mp3`;

const pollFunction = () => (gameState, setGameState) => {
  try {
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

const getWordOfDay = (language) => {
  const timeElapsed = Date.now();
  const now = new Date(timeElapsed);
  const value = now.getDay() + now.getMonth() + now.getFullYear();
  return localization[language].wordle.wordlist[value % localization[language].wordle.wordlist.length];
};

const submitWordle = ({
  setAttemptCounter, refs, setLastGuessTimestamp, attemptCounter, setGuess,
  setErrorMessage, wordOfDay, awwToggle, yayToggle, completedWords, setCompletedWords,
  language,
}) => {
  const word = refs.map((ref) => ref.value).join('');

  setAttemptCounter(attemptCounter + 1);
  setLastGuessTimestamp(Date.now());
  setGuess(word);
  setErrorMessage('');
  // toggleSound();

  if (word.length != wordOfDay.length) {
    setErrorMessage(localization[language].wordle.errors.maxLengthErr);
  } else if (word !== wordOfDay) {
    setErrorMessage(localization[language].wordle.errors.wordErr);
    awwToggle();
    const bits = word.split('');
    const pieces = wordOfDay.split('');
    bits.map((c, index) => {
      if (refs[index].className.indexOf('has-error') !== -1) {
        refs[index].className = refs[index].className.replace('has-error', '');
      }
      if (refs[index].className.indexOf('has-success') !== -1) {
        refs[index].className = refs[index].className.replace('has-success', '');
      }

      if (c !== pieces[index]) {
        refs[index].className = `${refs[index].className} has-error`;
      }
      if (c === pieces[index]) {
        refs[index].className = `${refs[index].className} has-success`;
      }
    });
  } else {
    wordOfDay.split('').map((w, index) => { refs[index].className = `${refs[index].className} has-success`; });
    setCompletedWords([...completedWords, wordOfDay]);
    yayToggle();
  }
};

export default function Wordle() {
  const {
    setWordleGameState, wordleGameState, setWordlePollFunction, language,
  } = useContext(AppContext);
  const wordOfDay = getWordOfDay(language);

  const [completedWords, setCompletedWords] = useState(wordleGameState.completedWords || []);
  const [attemptCounter, setAttemptCounter] = useState(wordleGameState.attemptCounter || 0);
  const [guess, setGuess] = useState(wordleGameState.guess || '');
  const [lastGuessTimestamp, setLastGuessTimestamp] = useState(wordleGameState.lastGuessTimestamp || Date.now());
  const [errorMessage, setErrorMessage] = useState('');

  const refs = new Array(wordOfDay.length).fill(useRef(null));

  useEffect(() => {
    setWordleGameState({
      completedWords,
      attemptCounter,
      guess,
      lastGuessTimestamp,
    });
  }, [completedWords,
    attemptCounter,
    guess,
    lastGuessTimestamp]);

  useEffect(() => {
    setWordlePollFunction(pollFunction);
  }, []);

  const [yayPlaying, yayToggle] = useAudio(YAY_SOUND_URL);
  const [awwPlaying, awwToggle] = useAudio(AWW_SOUND_URL);
  console.log({ completedWords });
  const isCompletedToday = completedWords.at(-1) === wordOfDay;
  console.log({ isCompletedToday, completedWords });

  return (
    <Flex alignSelf="center" maxWidth="500px" maxHeight="800px">
      <Box>
        {errorMessage.length > 0 ? (
          <ErrorCard>
            <Header.h5>{localization[language].wordle.errors.title}</Header.h5>
            <Card.Body>{errorMessage}</Card.Body>
          </ErrorCard>
        ) : null}

        <Card>
          <CustomForm flexDirection="row">
            {wordOfDay.split('').map((letter, index) => {
              const valueProp = { value: wordOfDay.split('')[index] };
              return (
                <CustomTextField
                  activeColor="#4AAFF1"
                  inputRef={(ref) => { refs[index] = ref; }}
                  className={isCompletedToday ? 'has-success' : ''}
                  inputProps={
                { maxLength: 1 }
            }
                  onInput={(e) => {
                    if (e.target.value.length > 1) {
                      e.target.value = e.target.value[0];
                    }
                    if (e.target.value.length === 1 && index !== wordOfDay.length - 1) {
                      refs[index + 1].focus();
                    }
                  }}
                  onKeyUp={(event) => {
                    const key = event.keyCode || event.charCode;

                    if ((key === 8 || key === 46) && index > 0) { refs[index - 1].focus(); }
                    if (key === 13) {
                      submitWordle({
                        setAttemptCounter,
                        refs,
                        setLastGuessTimestamp,
                        attemptCounter,
                        setGuess,
                        setErrorMessage,
                        wordOfDay,
                        language,
                        awwToggle,
                        yayToggle,
                        completedWords,
                        setCompletedWords,
                      });
                    }
                  }}
                  disabled={isCompletedToday}
                  {...isCompletedToday ? valueProp : null}
                />
              );
            })}
          </CustomForm>
          <CustomButton
            variant="contained-primary"
            onClick={() => {
              submitWordle({
                setAttemptCounter,
                refs,
                setLastGuessTimestamp,
                attemptCounter,
                setGuess,
                setErrorMessage,
                language,
                wordOfDay,
                awwToggle,
                yayToggle,
                completedWords,
                setCompletedWords,
              });
            }}
          >
            {localization[language].wordle.ui.button}
          </CustomButton>
        </Card>
        <Card>
          <Header.h5>{localization[language].wordle.ui.stats}</Header.h5>
          <Paragraph>
            <Text fontWeight="bold">{localization[language].wordle.stats.attemptCounter}</Text>
            <Text>{attemptCounter}</Text>
          </Paragraph>
          <Paragraph>
            <Text fontWeight="bold">{localization[language].wordle.stats.numberCompleted}</Text>
            <Text>{completedWords.length}</Text>
          </Paragraph>
          <Paragraph>
            <Text fontWeight="bold">{localization[language].wordle.stats.completedWords}</Text>
            <Text>{completedWords}</Text>
          </Paragraph>
        </Card>
      </Box>

    </Flex>
  );
}
