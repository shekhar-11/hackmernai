import { useState } from 'react';
import Logout from './Logout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseTopic, setCourseTopic] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [username, setUsername] = useState('John');
  const [showProfile, setShowProfile] = useState(false);

  const [generatedCourse, setGeneratedCourse] = useState(null);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseTopic.trim()) return;

    setIsGenerating(true);
    setGeneratedCourse(null);

    const generateMERNCourse = () => ({
      id: Date.now().toString(),
      title: 'MERN Stack Development',
      organization: 'UpSkillr Academy',
      progress: 0,
      totalLessons: 5,
      lessonsCompleted: 0,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to MERN Stack',
          content: 'Understanding the fundamentals of MongoDB, Express.js, React.js, and Node.js. Learn how these technologies work together to build full-stack applications.',
          duration: '15-20 minutes',
          completed: false,
          quiz: {
            question: 'What does MERN stand for?',
            options: [
              'MongoDB, Express.js, React.js, Node.js',
              'MySQL, Ember.js, Ruby, Node.js',
              'MongoDB, Electron, React.js, Next.js',
              'MySQL, Express.js, Redux, Node.js'
            ],
            correctOption: 0
          }
        },
        {
          id: 'lesson-2',
          title: 'Backend Development with Node.js and Express',
          content: 'Learn to create RESTful APIs using Node.js and Express.js. Understand routing, middleware, and handling HTTP requests.',
          duration: '25-30 minutes',
          completed: false,
          quiz: {
            question: 'Which of these is NOT a core feature of Express.js?',
            options: [
              'Routing',
              'Middleware support',
              'Built-in database',
              'Static file serving'
            ],
            correctOption: 2
          }
        },
        {
          id: 'lesson-3',
          title: 'Database Management with MongoDB',
          content: 'Master MongoDB database operations, schemas, and models using Mongoose. Learn about CRUD operations and data relationships.',
          duration: '20-25 minutes',
          completed: false,
          quiz: {
            question: 'What type of database is MongoDB?',
            options: [
              'Relational Database',
              'NoSQL Document Database',
              'Graph Database',
              'Key-Value Store'
            ],
            correctOption: 1
          }
        },
        {
          id: 'lesson-4',
          title: 'Frontend Development with React',
          content: 'Build interactive user interfaces with React.js. Learn about components, state management, hooks, and routing.',
          duration: '25-30 minutes',
          completed: false,
          quiz: {
            question: 'Which hook is used for side effects in React?',
            options: [
              'useState',
              'useContext',
              'useEffect',
              'useReducer'
            ],
            correctOption: 2
          }
        },
        {
          id: 'lesson-5',
          title: 'Full Stack Integration and Deployment',
          content: 'Connect frontend and backend, implement authentication, and learn about deployment strategies for MERN applications.',
          duration: '30-35 minutes',
          completed: false,
          quiz: {
            question: 'What is the recommended way to handle sensitive information in a MERN application?',
            options: [
              'Store in frontend code',
              'Use environment variables',
              'Save in public repository',
              'Hardcode in database'
            ],
            correctOption: 1
          }
        }
      ]
    });

    const generateGenericCourse = (topic) => ({
      id: Date.now().toString(),
      title: topic,
      organization: 'UpSkillr Academy',
      progress: 0,
      totalLessons: 5,
      lessonsCompleted: 0,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to ' + topic,
          content: 'Understanding the fundamentals and basic concepts of ' + topic,
          duration: '15-20 minutes',
          completed: false,
          quiz: {
            question: 'What is the primary purpose of ' + topic + '?',
            options: ['Learning fundamentals', 'Advanced applications', 'Industry standards', 'Historical context'],
            correctOption: 0
          }
        },
        {
          id: 'lesson-2',
          title: 'Core Concepts of ' + topic,
          content: 'Deep dive into the core principles and concepts of ' + topic,
          duration: '20-25 minutes',
          completed: false,
          quiz: {
            question: 'Which core concept is most important in ' + topic + '?',
            options: ['Theoretical foundation', 'Practical application', 'Technical implementation', 'Strategic planning'],
            correctOption: 1
          }
        },
        {
          id: 'lesson-3',
          title: 'Advanced Topics in ' + topic,
          content: 'Exploring advanced concepts and real-world applications of ' + topic,
          duration: '25-30 minutes',
          completed: false,
          quiz: {
            question: 'How do advanced topics in ' + topic + ' differ from basics?',
            options: ['Complexity level', 'Application scope', 'Implementation methods', 'Learning curve'],
            correctOption: 2
          }
        },
        {
          id: 'lesson-4',
          title: 'Practical Applications of ' + topic,
          content: 'Hands-on implementation and practical usage of ' + topic,
          duration: '25-30 minutes',
          completed: false,
          quiz: {
            question: 'What is a key practical application of ' + topic + '?',
            options: ['Industry use', 'Academic research', 'Personal projects', 'Professional development'],
            correctOption: 0
          }
        },
        {
          id: 'lesson-5',
          title: 'Best Practices and Future Trends in ' + topic,
          content: 'Understanding industry best practices and future developments in ' + topic,
          duration: '20-25 minutes',
          completed: false,
          quiz: {
            question: 'Which trend is most likely to impact the future of ' + topic + '?',
            options: ['Technological advancement', 'Market demands', 'Regulatory changes', 'Global adoption'],
            correctOption: 1
          }
        }
      ]
    });

    try {
      // Generate course based on topic
      const newCourse = courseTopic.toLowerCase().includes('mern') 
        ? generateMERNCourse()
        : generateGenericCourse(courseTopic);

      setMyCourses(prev => [...prev, newCourse]);
      setGeneratedCourse(newCourse);
      setCourseTopic('');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateCourse = (e) => {
    e.preventDefault();
    if (!courseTopic.trim()) return;
    setIsGenerating(true);
    
    // Create course content based on the topic
    const generateCourseContent = (topic) => {
      if (topic.toLowerCase().includes('mern')) {
        return {
          id: Date.now().toString(),
          title: 'MERN Stack Development',
          organization: 'UpSkillr Academy',
          progress: 0,
          totalLessons: 5,
          lessonsCompleted: 0,
          lessons: [
            {
              id: 'lesson-1',
              title: 'Introduction to MERN Stack',
              content: 'Understanding the fundamentals of MongoDB, Express.js, React.js, and Node.js. Learn how these technologies work together to build full-stack applications.',
              duration: '15-20 minutes',
              completed: false,
              quiz: {
                question: 'What does MERN stand for?',
                options: [
                  'MongoDB, Express.js, React.js, Node.js',
                  'MySQL, Ember.js, Ruby, Node.js',
                  'MongoDB, Electron, React.js, Next.js',
                  'MySQL, Express.js, Redux, Node.js'
                ],
                correctOption: 0
              }
            },
            {
              id: 'lesson-2',
              title: 'Backend Development with Node.js and Express',
              content: 'Learn to create RESTful APIs using Node.js and Express.js. Understand routing, middleware, and handling HTTP requests.',
              duration: '25-30 minutes',
              completed: false,
              quiz: {
                question: 'Which of these is NOT a core feature of Express.js?',
                options: [
                  'Routing',
                  'Middleware support',
                  'Built-in database',
                  'Static file serving'
                ],
                correctOption: 2
              }
            },
            {
              id: 'lesson-3',
              title: 'Database Management with MongoDB',
              content: 'Master MongoDB database operations, schemas, and models using Mongoose. Learn about CRUD operations and data relationships.',
              duration: '20-25 minutes',
              completed: false,
              quiz: {
                question: 'What type of database is MongoDB?',
                options: [
                  'Relational Database',
                  'NoSQL Document Database',
                  'Graph Database',
                  'Key-Value Store'
                ],
                correctOption: 1
              }
            },
            {
              id: 'lesson-4',
              title: 'Frontend Development with React',
              content: 'Build interactive user interfaces with React.js. Learn about components, state management, hooks, and routing.',
              duration: '25-30 minutes',
              completed: false,
              quiz: {
                question: 'Which hook is used for side effects in React?',
                options: [
                  'useState',
                  'useContext',
                  'useEffect',
                  'useReducer'
                ],
                correctOption: 2
              }
            },
            {
              id: 'lesson-5',
              title: 'Full Stack Integration and Deployment',
              content: 'Connect frontend and backend, implement authentication, and learn about deployment strategies for MERN applications.',
              duration: '30-35 minutes',
              completed: false,
              quiz: {
                question: 'What is the recommended way to handle sensitive information in a MERN application?',
                options: [
                  'Store in frontend code',
                  'Use environment variables',
                  'Save in public repository',
                  'Hardcode in database'
                ],
                correctOption: 1
              }
            }
          ]
        };
      } else {
        // Generic course structure for other topics
        return {
          id: Date.now().toString(),
          title: topic,
          organization: 'UpSkillr Academy',
          progress: 0,
          totalLessons: 5,
          lessonsCompleted: 0,
          lessons: [
            {
              id: 'lesson-1',
              title: 'Introduction to ' + topic,
              content: 'Understanding the fundamentals and basic concepts of ' + topic,
              duration: '15-20 minutes',
              completed: false,
              quiz: {
                question: 'What is the primary purpose of ' + topic + '?',
                options: ['Learning fundamentals', 'Advanced applications', 'Industry standards', 'Historical context'],
                correctOption: 0
              }
            },
            {
              id: 'lesson-2',
              title: 'Core Concepts of ' + topic,
              content: 'Deep dive into the core principles and concepts of ' + topic,
              duration: '20-25 minutes',
              completed: false,
              quiz: {
                question: 'Which core concept is most important in ' + topic + '?',
                options: ['Theoretical foundation', 'Practical application', 'Technical implementation', 'Strategic planning'],
                correctOption: 1
              }
            },
            {
              id: 'lesson-3',
              title: 'Advanced Topics in ' + topic,
              content: 'Exploring advanced concepts and real-world applications of ' + topic,
              duration: '25-30 minutes',
              completed: false,
              quiz: {
                question: 'How do advanced topics in ' + topic + ' differ from basics?',
                options: ['Complexity level', 'Application scope', 'Implementation methods', 'Learning curve'],
                correctOption: 2
              }
            },
            {
              id: 'lesson-4',
              title: 'Practical Applications of ' + topic,
              content: 'Hands-on implementation and practical usage of ' + topic,
              duration: '25-30 minutes',
              completed: false,
              quiz: {
                question: 'What is a key practical application of ' + topic + '?',
                options: ['Industry use', 'Academic research', 'Personal projects', 'Professional development'],
                correctOption: 0
              }
            },
            {
              id: 'lesson-5',
              title: 'Best Practices and Future Trends in ' + topic,
              content: 'Understanding industry best practices and future developments in ' + topic,
              duration: '20-25 minutes',
              completed: false,
              quiz: {
                question: 'Which trend is most likely to impact the future of ' + topic + '?',
                options: ['Technological advancement', 'Market demands', 'Regulatory changes', 'Global adoption'],
                correctOption: 1
              }
            }
          ]
        };
      }
    };

    const newCourse = generateCourseContent(courseTopic);
    setMyCourses(prev => [...prev, newCourse]);
    setGeneratedCourse(newCourse);
    setCourseTopic('');
    setIsGenerating(false);
  };

  const handleLessonComplete = (courseId, lessonId) => {
    setMyCourses(prev => {
      const updatedCourses = prev.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
          );
          const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
          const progress = (completedLessons / course.totalLessons) * 100;
          return { 
            ...course, 
            lessons: updatedLessons, 
            lessonsCompleted: completedLessons, 
            progress 
          };
        }
        return course;
      });

      // Update selectedCourse if it matches the courseId
      const updatedSelectedCourse = updatedCourses.find(c => c.id === courseId);
      if (updatedSelectedCourse) {
        setSelectedCourse(updatedSelectedCourse);
      }

      return updatedCourses;
    });
  };

  const handleQuizComplete = (courseId, lessonId, score) => {
    setMyCourses(prev => {
      const updatedCourses = prev.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => 
            lesson.id === lessonId ? { 
              ...lesson, 
              quizCompleted: true, 
              quizScore: score 
            } : lesson
          );
          const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
          const progress = (completedLessons / course.totalLessons) * 100;
          return { 
            ...course, 
            lessons: updatedLessons, 
            lessonsCompleted: completedLessons, 
            progress,
            quizScore: score // Add overall quiz score to course
          };
        }
        return course;
      });

      // Update selectedCourse if it matches the courseId
      const updatedSelectedCourse = updatedCourses.find(c => c.id === courseId);
      if (updatedSelectedCourse) {
        setSelectedCourse(updatedSelectedCourse);
      }

      return updatedCourses;
    });
  };

  const ModernCourseCard = ({ course }) => (
    <div className="flex flex-col md:flex-row items-stretch bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 mb-1">{course.organization || 'UpSkillr Academy'}</div>
        <div className="text-xl font-bold text-gray-900 mb-1">{course.title}</div>
        <div className="text-gray-500 text-sm mb-2">Course · {Math.round(course.progress)}% complete</div>
      </div>
      <div className="flex flex-col justify-center items-end md:ml-8 bg-gray-50 rounded-xl px-6 py-4 min-w-[260px]">
        <div className="font-semibold text-gray-800 mb-1 flex items-center">
          <span className="mr-2">📖</span>
          {course.lessons[0]?.title || 'Lesson Overview'}
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <span className="mr-1">📖</span>
          Lesson ({course.lessons[0]?.duration || '4 minutes'})
        </div>
        <button
          onClick={() => setSelectedCourse(course)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-6 py-2 transition-colors duration-200 shadow"
        >
          Get started
        </button>
      </div>
    </div>
  );

  const CourseContent = ({ course, onBack }) => {
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    const progress = (completedLessons / course.totalLessons) * 100;
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);

    const allLessonsCompleted = course.lessons.every(lesson => lesson.completed);

    const handleStartQuiz = () => {
      setShowQuiz(true);
      setQuizResult(null);
      setQuizAnswers({});
      setCurrentQuestionIndex(0);
      setAllAnswers([]);
    };

    const handleQuizAnswer = (questionId, answer) => {
      setQuizAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
    };

    const handleNextQuestion = () => {
      if (quizAnswers[`q${currentQuestionIndex}`] === undefined) return;
      
      const isCorrect = quizAnswers[`q${currentQuestionIndex}`] === course.lessons[currentQuestionIndex].quiz.correctOption;
      
      setAllAnswers(prev => [...prev, {
        questionIndex: currentQuestionIndex,
        selectedOption: quizAnswers[`q${currentQuestionIndex}`],
        isCorrect
      }]);
      
      setQuizAnswers({});
      
      if (currentQuestionIndex < course.lessons.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const correctAnswers = allAnswers.filter(answer => answer.isCorrect).length + (isCorrect ? 1 : 0);
        const score = Math.round((correctAnswers * 100) / course.lessons.length);
        
        setQuizResult({
          score,
          correctAnswers,
          totalQuestions: course.lessons.length,
          passed: score >= 70,
          answers: [...allAnswers, {
            questionIndex: currentQuestionIndex,
            selectedOption: quizAnswers[`q${currentQuestionIndex}`],
            isCorrect
          }]
        });
      }
    };

    return (
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
          </div>
          {quizResult && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center">
              <span className="mr-2">📝</span>
              Quiz Score: {quizResult.score}%
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Progress</span>
            <span className="text-gray-600 text-sm">{completedLessons} / {course.totalLessons} lessons completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#2563eb] h-3 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {course.lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={lesson.completed}
                  onChange={() => handleLessonComplete(course.id, lesson.id)}
                  className="h-5 w-5 text-[#2563eb] rounded border-gray-300 focus:ring-[#2563eb] cursor-pointer mr-4 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-gray-800 text-base mr-2">{lesson.title}</span>
                    <span className="flex items-center text-gray-500 text-xs ml-2">
                      <span className="mr-1">📖</span>
                      Lesson ({lesson.duration})
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{lesson.content}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Course Quiz</h3>
              {quizResult && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">Score:</span>
                  <span className={`font-semibold ${
                    quizResult.score >= 70 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {quizResult.score}%
                  </span>
                </div>
              )}
            </div>
            
            {!allLessonsCompleted ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Complete all lessons to unlock the quiz</p>
                <p className="text-sm text-gray-500 mt-2">{completedLessons} of {course.totalLessons} lessons completed</p>
              </div>
            ) : showQuiz ? (
              <div className="space-y-6">
                {quizResult ? (
                  <div>
                    <div className="text-center mb-6">
                      <div className={`text-4xl mb-4 ${quizResult.passed ? 'text-green-500' : 'text-orange-500'}`}>
                        {quizResult.passed ? '🎉' : '📝'}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {quizResult.passed ? 'Congratulations!' : 'Keep Learning!'}
                      </h3>
                      <p className="text-lg mb-2">Final Score: <span className="font-bold">{quizResult.score}%</span></p>
                      <p className="text-gray-600">
                        Correct Answers: {quizResult.correctAnswers} out of {quizResult.totalQuestions}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      {quizResult.answers.map((answer, idx) => {
                        const lesson = course.lessons[answer.questionIndex];
                        return (
                          <div key={idx} className="border-b border-gray-100 last:border-0 pb-4">
                            <div className="flex items-start">
                              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                answer.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {answer.isCorrect ? '✓' : '✗'}
                              </span>
                              <div className="ml-3">
                                <p className="font-medium">Question {idx + 1}</p>
                                <p className="text-gray-600 mt-1">{lesson.quiz.question}</p>
                                <p className="text-sm mt-2">
                                  <span className="font-medium">Correct answer:</span> {lesson.quiz.options[lesson.quiz.correctOption]}
                                </p>
                                {!answer.isCorrect && (
                                  <p className="text-sm mt-1 text-red-600">
                                    Your answer: {lesson.quiz.options[answer.selectedOption]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizResult(null);
                        }}
                        className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
                      >
                        Return to Course
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-600">Question {currentQuestionIndex + 1} of {course.lessons.length}</p>
                    </div>
                    
                    <div className="mb-6">
                      <p className="font-medium text-gray-800 mb-4">
                        {course.lessons[currentQuestionIndex].quiz.question}
                      </p>
                      <div className="space-y-3">
                        {course.lessons[currentQuestionIndex].quiz.options.map((option, idx) => (
                          <div key={idx} className="flex items-center">
                            <input
                              type="radio"
                              id={`q${currentQuestionIndex}-${idx}`}
                              name={`question-${currentQuestionIndex}`}
                              value={idx}
                              checked={quizAnswers[`q${currentQuestionIndex}`] === idx}
                              onChange={() => handleQuizAnswer(`q${currentQuestionIndex}`, idx)}
                              className="h-4 w-4 text-[#2563eb]"
                            />
                            <label htmlFor={`q${currentQuestionIndex}-${idx}`} className="ml-2 text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      disabled={quizAnswers[`q${currentQuestionIndex}`] === undefined}
                      className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                        quizAnswers[`q${currentQuestionIndex}`] === undefined
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#2563eb] hover:bg-blue-700'
                      }`}
                    >
                      {currentQuestionIndex < course.lessons.length - 1 ? 'Next Question' : 'Submit Quiz'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md"
                >
                  {quizResult ? 'Retake Quiz' : 'Start Quiz'}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Test your knowledge with {course.lessons.length} questions
                </p>
                {quizResult && (
                  <p className="text-xs text-gray-500 mt-1">
                    Your previous score: {quizResult.score}%
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    const [form, setForm] = useState({ username, email: '', password: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess('');
      setError('');

      try {
        const response = await fetch('/auth/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for sending cookies
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update profile');
        }

        setUsername(form.username);
        setSuccess('Profile updated successfully!');
      } catch (err) {
        setError(err.message || 'Failed to update profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        {success && <div className="mb-4 text-green-600 text-center font-medium">{success}</div>}
        {error && <div className="mb-4 text-red-600 text-center font-medium">{error}</div>}
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowProfile(false)}
            className="text-[#2563eb] hover:text-blue-700 transition duration-200 font-medium"
            disabled={loading}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  const MyCoursesContent = () => {
    const completedCourses = myCourses.filter(course => course.progress === 100);
    const inProgressCourses = myCourses.filter(course => course.progress < 100);
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
        {completedCourses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Courses</h3>
            {completedCourses.map(course => (
              <ModernCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        {inProgressCourses.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Courses in Progress</h3>
            {inProgressCourses.map(course => (
              <ModernCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        {myCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't started any courses yet.</p>
            <p className="text-gray-500 mt-2">Generate a new course to get started!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Profile Icon */}
        <div className="flex flex-col items-center py-6 border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 mb-2">
            <span role="img" aria-label="profile">👤</span>
          </div>
          <div className="font-semibold text-gray-700">{username}</div>
        </div>
        <nav className="mt-4 flex-1">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setSelectedCourse(null);
              setShowProfile(false);
            }}
            className={`w-full text-left px-6 py-4 flex items-center transition-colors duration-200 ${
              activeTab === 'dashboard' && !showProfile
                ? 'bg-blue-50 text-[#2563eb] border-r-4 border-[#2563eb]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('my-courses');
              setSelectedCourse(null);
              setShowProfile(false);
            }}
            className={`w-full text-left px-6 py-4 flex items-center transition-colors duration-200 ${
              activeTab === 'my-courses' && !showProfile
                ? 'bg-blue-50 text-[#2563eb] border-r-4 border-[#2563eb]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-xl">📚</span>
            <span className="font-medium">My Courses</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(true);
              setSelectedCourse(null);
            }}
            className={`w-full text-left px-6 py-4 flex items-center transition-colors duration-200 ${
              showProfile
                ? 'bg-blue-50 text-[#2563eb] border-r-4 border-[#2563eb]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3 text-xl">📝</span>
            <span className="font-medium">Edit Profile</span>
          </button>
        </nav>
       <Logout/>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {showProfile ? (
          <ProfilePage />
        ) : selectedCourse ? (
          <CourseContent 
            course={selectedCourse} 
            onBack={() => setSelectedCourse(null)} 
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, {username}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    What would you like to learn today?
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl border border-gray-100">
                  <form onSubmit={handleGenerateCourse} className="flex flex-row gap-4 items-center" autoComplete="off">
                    <input
                      type="text"
                      value={courseTopic}
                      onChange={e => setCourseTopic(e.target.value)}
                      placeholder="Enter a topic or course you want to learn..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-gray-800 placeholder-gray-400 bg-white"
                      autoFocus={false}
                    />
                    <button
                      type="submit" onClick={handleCourseSubmit}
                      disabled={isGenerating || !courseTopic.trim()}
                      className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
                        ${isGenerating || !courseTopic.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                      `}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Course'}
                    </button>
                  </form>
                  {isGenerating && (
                    <div className="mt-4 flex items-center space-x-3 text-[#2563eb]">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2563eb]"></div>
                      <span className="font-medium">Generating your course...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'my-courses' && <MyCoursesContent />}
            {generatedCourse && !isGenerating && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="bg-[#2563eb] text-white p-2 rounded-full mr-3">
                    <span className="text-xl">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{generatedCourse.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">Your new course is ready with 5 lessons and quizzes!</p>
                
                {/* Course Lessons Preview */}
                <div className="bg-white rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Lessons:</h4>
                  <ul className="space-y-1">
                    {generatedCourse.lessons.map((lesson, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="mr-2 text-[#2563eb]">•</span>
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    5 lessons with interactive quizzes
                  </span>
                  <button 
                    onClick={() => setSelectedCourse(generatedCourse)}
                    className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-200"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 