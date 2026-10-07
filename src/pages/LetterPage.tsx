import { useParams } from 'react-router';

export function LetterPage() {
  const { letterId } = useParams();
  return (
    <>
      <h1>Open When letter</h1>
      <p>[PLACEHOLDER LETTER]</p>
      <p>
        Route reference: <code>{letterId}</code>
      </p>
    </>
  );
}
