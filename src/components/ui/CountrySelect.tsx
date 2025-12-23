import React, { useState, useEffect, useRef } from 'react'
import { countryCodes } from '../../data/countryCodes'
import { motion, AnimatePresence } from 'framer-motion'

interface CountrySelectProps {
    value: string
    onChange: (value: string) => void
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Find selected country object
    const selectedCountry = countryCodes.find(c => c.dial_code === value) || countryCodes.find(c => c.code === 'IN')

    // Filter countries based on search
    const filteredCountries = countryCodes.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dial_code.includes(search) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    )

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative shrink-0" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => {
                    setIsOpen(!isOpen)
                    setSearch('') // Reset search on open
                }}
                className="w-[110px] h-full bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-4 flex items-center justify-between gap-2 text-neutral-900 dark:text-white font-mono text-sm focus:border-blue-500 focus:outline-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
                <span className="flex items-center gap-2 truncate">
                    <span>{selectedCountry?.flag}</span>
                    <span>{selectedCountry?.dial_code}</span>
                </span>
                <svg className={`w-3 h-3 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-[280px] max-h-[300px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="p-2 border-b border-neutral-100 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 z-10">
                            <input
                                type="text"
                                placeholder="Search country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                                className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>

                        {/* Country List */}
                        <div className="overflow-y-auto flex-1 p-1 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                    <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => {
                                            onChange(country.dial_code)
                                            setIsOpen(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left font-mono ${value === country.dial_code
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                            }`}
                                    >
                                        <span className="text-lg">{country.flag}</span>
                                        <span className="flex-1 truncate">{country.name}</span>
                                        <span className="text-neutral-400 text-xs">{country.dial_code}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-xs text-neutral-500 font-mono">
                                    No countries found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
