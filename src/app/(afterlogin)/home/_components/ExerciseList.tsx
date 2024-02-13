import ExerciseItem from './ExerciseItem';

const ExerciseList = () => {
  return (
    <section>
      <h3>내 발표연습 목록</h3>
      <ul>
        <li>
          <ExerciseItem />
        </li>
      </ul>
    </section>
  );
};

export default ExerciseList;
