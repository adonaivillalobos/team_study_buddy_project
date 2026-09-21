export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 py-6 text-center font-body text-sm text-gray-600">
        © {new Date().getFullYear()} StudyBuddy. All rights reserved.
      </div>
    </footer>
  );
}