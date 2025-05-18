import { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseTopic, setCourseTopic] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [username, setUsername] = useState('John');
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Redirect to login page by reloading the app
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGenerateCourse = (e) => {
    e.preventDefault();
    if (!courseTopic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newCourse = {
        id: Date.now(),
        organization: 'UpSkillr Academy',
        title: courseTopic,
        progress: 0,
        lessonsCompleted: 0,
        totalLessons: 5,
        createdAt: new Date().toISOString(),
        lessons: [
          { id: 1, title: 'Lesson Overview', completed: false, content: 'This is an introduction to the course...', quiz: 'Quiz 1: Basic Concepts', duration: '4 minutes', type: 'lesson' },
          { id: 2, title: 'Core Concepts', completed: false, content: 'Understanding the fundamental concepts...', quiz: 'Quiz 2: Core Principles', duration: '7 minutes', type: 'lesson' },
          { id: 3, title: 'Advanced Topics', completed: false, content: 'Diving deeper into advanced concepts...', quiz: 'Quiz 3: Advanced Applications', duration: '5 minutes', type: 'lesson' },
          { id: 4, title: 'Practical Applications', completed: false, content: 'Real-world applications and examples...', quiz: 'Quiz 4: Practical Scenarios', duration: '6 minutes', type: 'lesson' },
          { id: 5, title: 'Final Assessment', completed: false, content: 'Comprehensive review and final project...', quiz: 'Final Quiz: Course Assessment', duration: '8 minutes', type: 'lesson' }
        ]
      };
      setMyCourses(prev => [...prev, newCourse]);
      setCourseTopic('');
      setIsGenerating(false);
    }, 1000);
  };

  const handleLessonComplete = (courseId, lessonId) => {
    setMyCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson);
        const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
        const progress = (completedLessons / course.totalLessons) * 100;
        return { ...course, lessons: updatedLessons, lessonsCompleted: completedLessons, progress };
      }
      return course;
    }));
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
    return (
      <div className="p-8">
        <div className="mb-6 flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
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
            <div key={lesson.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center">
              <input
                type="checkbox"
                checked={lesson.completed}
                onChange={() => handleLessonComplete(course.id, lesson.id)}
                className="h-5 w-5 text-[#2563eb] rounded border-gray-300 focus:ring-[#2563eb] cursor-pointer mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-gray-800 text-base mr-2">{lesson.title}</span>
                  <span className="flex items-center text-gray-500 text-xs ml-2">
                    <span className="mr-1">📖</span>
                    Lesson ({lesson.duration})
                  </span>
                </div>
                <p className="text-gray-600 mb-2 text-sm">{lesson.content}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-700">{lesson.quiz}</p>
                </div>
              </div>
            </div>
          ))}
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
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
          >
            <span className="mr-3 text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
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
                      type="submit"
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 