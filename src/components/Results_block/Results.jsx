import "./results.css";

function Results({ semester, year, resultsData, gpa }) {
  return (
    <div className="results-container">
      <h2 className="semester-title">
        YEAR {year} SEMESTER {semester}
      </h2>
      <table className="results-table">
        <thead>
          <tr className="results-header">
            <th>COURSE ID</th>
            <th>COURSE NAME</th>
            <th>RESULT</th>
          </tr>
        </thead>
        <tbody>
          {resultsData.map((course, index) => (
            <tr key={index} className="results-row">
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="gpa-container">
        <div className="gpa-box">GPA for this Semester = {gpa}</div>
      </div>
    </div>
  );
}

export default Results;
