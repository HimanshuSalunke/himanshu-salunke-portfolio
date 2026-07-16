import React from 'react'
import { motion } from 'framer-motion'
import { 
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte,
  SiPython, SiFastapi, SiNodedotjs, SiExpress, SiDjango, SiFlask, SiSpring, SiLaravel, SiRubyonrails, SiGo, SiRust,
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiKeras, SiPandas, SiNumpy,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiSqlite, SiFirebase, SiSupabase, SiAmazondynamodb, SiElasticsearch,
  SiDocker, SiKubernetes, SiAmazon, SiGooglecloud, SiGit, SiGithub, SiGitlab, SiJenkins,
  SiLinux, SiUbuntu, SiApple, SiJupyter, SiApacheairflow, SiApachespark, SiHuggingface, SiOnnx
} from 'react-icons/si'
import { 
  FaBrain, FaRobot, FaChartLine, FaEye, FaCogs, FaCloud, FaCode, FaServer, FaMobile, FaDesktop,
  FaChartBar, FaChartPie, FaMicroscope, FaWarehouse, FaCogs as FaGears, FaLanguage, FaUsers, FaMicrosoft
} from 'react-icons/fa'
import { 
  MdDataUsage, MdTransform, MdEmojiEmotions
} from 'react-icons/md'

// Tech icons configuration with real official icons
const TECH_ICONS: { [key: string]: { icon: React.ComponentType<{ size?: number }>; color: string; size?: number } } = {
  // Frontend
  'React': { icon: SiReact, color: 'bg-blue-500', size: 16 },
  'TypeScript': { icon: SiTypescript, color: 'bg-blue-600', size: 16 },
  'JavaScript': { icon: SiJavascript, color: 'bg-yellow-500', size: 16 },
  'HTML': { icon: SiHtml5, color: 'bg-orange-500', size: 16 },
  'CSS': { icon: SiCss3, color: 'bg-blue-500', size: 16 },
  'Tailwind': { icon: SiTailwindcss, color: 'bg-cyan-500', size: 16 },
  'Next.js': { icon: SiNextdotjs, color: 'bg-black dark:bg-white', size: 16 },
  'Vue': { icon: SiVuedotjs, color: 'bg-green-500', size: 16 },
  'Angular': { icon: SiAngular, color: 'bg-red-500', size: 16 },
  'Svelte': { icon: SiSvelte, color: 'bg-orange-500', size: 16 },
  
  // Backend
  'Python': { icon: SiPython, color: 'bg-yellow-500', size: 16 },
  'FastAPI': { icon: SiFastapi, color: 'bg-green-600', size: 16 },
  'Node.js': { icon: SiNodedotjs, color: 'bg-green-600', size: 16 },
  'Express': { icon: SiExpress, color: 'bg-gray-600', size: 16 },
  'Django': { icon: SiDjango, color: 'bg-green-700', size: 16 },
  'Flask': { icon: SiFlask, color: 'bg-red-500', size: 16 },
  'Spring': { icon: SiSpring, color: 'bg-green-600', size: 16 },
  'Laravel': { icon: SiLaravel, color: 'bg-red-600', size: 16 },
  'Ruby on Rails': { icon: SiRubyonrails, color: 'bg-red-500', size: 16 },
  'Go': { icon: SiGo, color: 'bg-cyan-500', size: 16 },
  'Rust': { icon: SiRust, color: 'bg-orange-600', size: 16 },
  
  // AI/ML
  'TensorFlow': { icon: SiTensorflow, color: 'bg-orange-500', size: 16 },
  'PyTorch': { icon: SiPytorch, color: 'bg-red-500', size: 16 },
  'MediaPipe': { icon: FaMobile, color: 'bg-blue-500', size: 14 },
  'OpenCV': { icon: SiOpencv, color: 'bg-green-600', size: 16 },
  'Computer Vision': { icon: FaEye, color: 'bg-purple-500', size: 14 },
  'Machine Learning': { icon: FaRobot, color: 'bg-purple-600', size: 14 },
  'Deep Learning': { icon: FaBrain, color: 'bg-purple-500', size: 14 },
  'AI': { icon: FaRobot, color: 'bg-purple-600', size: 14 },
  'ML': { icon: FaChartLine, color: 'bg-purple-500', size: 14 },
  'Scikit-learn': { icon: SiScikitlearn, color: 'bg-orange-500', size: 16 },
  'Keras': { icon: SiKeras, color: 'bg-red-500', size: 16 },
  'Pandas': { icon: SiPandas, color: 'bg-blue-600', size: 16 },
  'NumPy': { icon: SiNumpy, color: 'bg-blue-500', size: 16 },
  
  // Database
  'PostgreSQL': { icon: SiPostgresql, color: 'bg-blue-600', size: 16 },
  'MySQL': { icon: SiMysql, color: 'bg-blue-500', size: 16 },
  'MongoDB': { icon: SiMongodb, color: 'bg-green-600', size: 16 },
  'Redis': { icon: SiRedis, color: 'bg-red-500', size: 16 },
  'SQLite': { icon: SiSqlite, color: 'bg-blue-500', size: 16 },
  'Firebase': { icon: SiFirebase, color: 'bg-orange-500', size: 16 },
  'Supabase': { icon: SiSupabase, color: 'bg-green-600', size: 16 },
  'DynamoDB': { icon: SiAmazondynamodb, color: 'bg-yellow-500', size: 16 },
  'Elasticsearch': { icon: SiElasticsearch, color: 'bg-yellow-600', size: 16 },
  
  // Tools & Others
  'WebSockets': { icon: FaCogs, color: 'bg-blue-500', size: 14 },
  'Real-time Processing': { icon: FaServer, color: 'bg-yellow-500', size: 14 },
  'Docker': { icon: SiDocker, color: 'bg-blue-500', size: 16 },
  'Kubernetes': { icon: SiKubernetes, color: 'bg-blue-600', size: 16 },
  'AWS': { icon: SiAmazon, color: 'bg-orange-500', size: 16 },
  'Azure': { icon: FaCloud, color: 'bg-blue-500', size: 14 },
  'GCP': { icon: SiGooglecloud, color: 'bg-blue-600', size: 16 },
  'Git': { icon: SiGit, color: 'bg-orange-500', size: 16 },
  'GitHub': { icon: SiGithub, color: 'bg-gray-800', size: 16 },
  'GitLab': { icon: SiGitlab, color: 'bg-orange-500', size: 16 },
  'Jenkins': { icon: SiJenkins, color: 'bg-blue-600', size: 16 },
  'CI/CD': { icon: FaCode, color: 'bg-blue-500', size: 14 },
  'Linux': { icon: SiLinux, color: 'bg-yellow-500', size: 16 },
  'Ubuntu': { icon: SiUbuntu, color: 'bg-orange-500', size: 16 },
  'Windows': { icon: FaDesktop, color: 'bg-blue-500', size: 14 },
  'macOS': { icon: SiApple, color: 'bg-gray-600', size: 16 },
  
  // Data Science & Visualization
  'Matplotlib': { icon: FaChartBar, color: 'bg-blue-600', size: 14 },
  'Seaborn': { icon: FaChartPie, color: 'bg-purple-500', size: 14 },
  'Plotly': { icon: FaChartLine, color: 'bg-green-500', size: 14 },
  'Jupyter Notebook': { icon: SiJupyter, color: 'bg-orange-500', size: 16 },
  'Statistical Analysis': { icon: FaMicroscope, color: 'bg-indigo-500', size: 14 },
  'Data Visualization': { icon: FaChartBar, color: 'bg-blue-500', size: 14 },
  
  // AI/ML Additional
  'YOLO26': { icon: FaEye, color: 'bg-red-600', size: 14 },
  'EasyOCR': { icon: FaEye, color: 'bg-green-600', size: 14 },
  'ONNX Runtime': { icon: SiOnnx, color: 'bg-purple-600', size: 16 },
  'BERT': { icon: FaBrain, color: 'bg-orange-600', size: 14 },
  'Transformers': { icon: SiHuggingface, color: 'bg-yellow-500', size: 16 },
  'scikit-learn': { icon: SiScikitlearn, color: 'bg-orange-500', size: 16 },
  'NLP': { icon: FaLanguage, color: 'bg-blue-500', size: 14 },
  'Fine-tuning': { icon: FaGears, color: 'bg-purple-500', size: 14 },
  'Emotion Classification': { icon: MdEmojiEmotions, color: 'bg-pink-500', size: 16 },
  
  // Data Engineering
  'Microsoft Fabric': { icon: FaMicrosoft, color: 'bg-sky-600', size: 14 },
  'OneLake': { icon: FaCloud, color: 'bg-sky-500', size: 14 },
  'Lakehouse': { icon: FaWarehouse, color: 'bg-cyan-600', size: 14 },
  'Apache Spark': { icon: SiApachespark, color: 'bg-orange-500', size: 16 },
  'Delta Lake': { icon: FaWarehouse, color: 'bg-cyan-500', size: 14 },
  'Apache Airflow': { icon: SiApacheairflow, color: 'bg-blue-500', size: 16 },
  'AWS S3': { icon: SiAmazon, color: 'bg-orange-500', size: 16 },
  'AWS Glue': { icon: SiAmazon, color: 'bg-orange-500', size: 16 },
  'Data Engineering': { icon: FaGears, color: 'bg-blue-600', size: 14 },
  'ETL Pipeline': { icon: MdTransform, color: 'bg-green-500', size: 16 },
  'ETL Pipelines': { icon: MdTransform, color: 'bg-green-500', size: 16 },
  'Data Warehousing': { icon: FaWarehouse, color: 'bg-blue-500', size: 14 },
  'Dimensional Modeling': { icon: MdDataUsage, color: 'bg-purple-500', size: 16 },
  
  // General Categories
  'Social Science': { icon: FaUsers, color: 'bg-green-500', size: 14 },
  'Plate Recognizer API': { icon: FaEye, color: 'bg-blue-500', size: 14 }
}

interface TechBadgeProps {
  tech: string
  index: number
}

const TechBadge: React.FC<TechBadgeProps> = React.memo(({ tech, index }) => {
  const getTechIcon = React.useCallback((tech: string) => {
    return TECH_ICONS[tech] || { 
      icon: () => <span className="text-xs font-bold">{tech.charAt(0).toUpperCase()}</span>, 
      color: 'bg-gray-500',
      size: 16
    }
  }, [])

  const iconConfig = getTechIcon(tech)
  const IconComponent = iconConfig.icon

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      role="button"
      tabIndex={0}
      aria-label={`Technology: ${tech}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          // Could add click handler here if needed
        }
      }}
    >
      <div 
        className={`w-5 h-5 ${iconConfig.color} rounded-full flex items-center justify-center text-white`}
        aria-hidden="true"
      >
        <IconComponent size={iconConfig.size || 16} />
      </div>
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {tech}
      </span>
    </motion.div>
  )
})

TechBadge.displayName = 'TechBadge'

export { TechBadge }
