<!-- src/components/team/ProjectGanttChart.vue -->
<template>
  <div class="bg-white shadow rounded-lg overflow-hidden flex flex-col h-full">
    <!-- Header with filters and controls -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
        <!-- Title with filter indicators -->
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold text-gray-900">Project Timeline</h2>
          
          <!-- Active filters indication -->
          <div class="flex flex-wrap gap-2 mt-2 items-center text-sm text-gray-600">
            <span v-if="departmentName" class="bg-red-50 border border-red-200 text-red-700 text-xs rounded-full px-2.5 py-1 flex items-center">
              {{ departmentName }}
              <XMarkIcon 
                @click="$emit('clearFilter', 'department_id')" 
                class="ml-1 h-3.5 w-3.5 cursor-pointer hover:text-red-800" 
              />
            </span>
            <span v-if="dateRangeLabel" class="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-full px-2.5 py-1 flex items-center">
              {{ dateRangeLabel }}
            </span>
            <span v-if="!departmentName && !dateRangeLabel" class="text-gray-500 text-xs">
              Showing all projects
            </span>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap gap-2 items-center">
          <!-- Time range navigation -->
          <div class="inline-flex items-center rounded-md shadow-sm">
            <button
              @click="moveTimelinePrev"
              class="px-2.5 py-1.5 border border-gray-300 rounded-l-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500"
              title="Previous Period"
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <button
              @click="resetTimeline"
              class="px-3 py-1.5 border-t border-b border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500"
              title="Reset to current period"
            >
              Today
            </button>
            <button
              @click="moveTimelineNext"
              class="px-2.5 py-1.5 border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500"
              title="Next Period"
            >
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          </div>

          <!-- Time scale selector -->
          <div class="inline-flex rounded-md shadow-sm">
            <button
              @click="setViewMode('day')"
              class="px-3 py-1.5 text-sm font-medium rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
              :class="viewMode === 'day' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
            >
              Day
            </button>
            <button
              @click="setViewMode('week')"
              class="px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
              :class="viewMode === 'week' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50'"
            >
              Week
            </button>
            <button
              @click="setViewMode('month')"
              class="px-3 py-1.5 text-sm font-medium rounded-r-md focus:outline-none focus:ring-1 focus:ring-red-500"
              :class="viewMode === 'month' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
            >
              Month
            </button>
          </div>

          <!-- Zoom controls -->
          <div class="inline-flex rounded-md shadow-sm">
            <button
              @click="decreaseZoom"
              class="px-2.5 py-1.5 border border-gray-300 rounded-l-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
              :disabled="zoomLevel <= minZoomLevel"
              title="Zoom Out"
            >
              <MinusIcon class="h-4 w-4" />
            </button>
            <span class="flex items-center justify-center px-2 border-t border-b border-gray-300 bg-white text-xs font-medium">
              {{ zoomLevel }}x
            </span>
            <button
              @click="increaseZoom"
              class="px-2.5 py-1.5 border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
              :disabled="zoomLevel >= maxZoomLevel"
              title="Zoom In"
            >
              <PlusIcon class="h-4 w-4" />
            </button>
          </div>

          <!-- Expand/Collapse All -->
          <button
            @click="toggleExpandAll"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500"
            :title="allExpanded ? 'Collapse All' : 'Expand All'"
          >
            <ChevronRightIcon
              class="h-4 w-4 mr-1 transform transition-transform"
              :class="{ 'rotate-90': allExpanded }"
            />
            {{ allExpanded ? 'Collapse All' : 'Expand All' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Gantt Chart Container -->
    <div class="flex-grow overflow-auto">
      <!-- Project Gantt Chart -->
      <div class="gantt-container grid grid-cols-[minmax(250px,auto)_1fr]" style="min-width: 1000px; min-height: 400px">
        <!-- Left side: Project & task names with sticky header -->
        <div class="project-names bg-white">
          <!-- Header -->
          <div class="h-16 sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 flex items-end">
            <h3 class="font-medium text-gray-700 pb-2">Projects & Tasks</h3>
          </div>

          <!-- Projects list -->
          <div class="project-list divide-y divide-gray-200">
            <div
              v-for="(project, projectIndex) in projects"
              :key="project.id"
              class="project-item"
            >
              <!-- Project row -->
              <div 
                class="project-row group flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                @click="toggleProject(projectIndex)"
                :class="{'bg-gray-50': project.expanded}"
              >
                <!-- Expand/collapse icon -->
                <button class="mr-2 flex-shrink-0 text-gray-400">
                  <ChevronRightIcon 
                    class="h-4 w-4 transform transition-transform" 
                    :class="{ 'rotate-90': project.expanded, 'text-gray-600': project.expanded }"
                  />
                </button>
                
                <!-- Project status indicator -->
                <div class="w-2 h-2 rounded-full mr-2 flex-shrink-0" :class="getStatusIndicatorClass(project.state)"></div>
                
                <!-- Project name -->
                <div class="flex-grow mr-3">
                  <div class="font-medium text-gray-900 truncate">{{ project.name }}</div>
                </div>
                
                <!-- Project progress indicator -->
                <div class="w-12 flex-shrink-0">
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full" 
                      :class="getProgressBarColorClass(project.progress)"
                      :style="{ width: `${project.progress || 0}%` }"
                    ></div>
                  </div>
                  <div class="text-xs text-center text-gray-500 mt-0.5">{{ project.progress || 0 }}%</div>
                </div>
              </div>

              <!-- Task rows (when expanded) -->
              <div v-if="project.expanded" class="task-list bg-gray-50">
                <div
                  v-for="task in project.tasks"
                  :key="task.id"
                  class="task-row flex items-center px-4 py-2.5 hover:bg-gray-100 pl-10 border-t border-gray-100 cursor-pointer"
                  @click.stop="handleTaskClick(task)"
                >
                  <!-- Task status indicator -->
                  <div class="w-2 h-2 rounded-full mr-2" :class="getStatusIndicatorClass(task.state)"></div>
                  
                  <!-- Task name -->
                  <div class="flex-grow mr-3">
                    <div class="text-sm text-gray-900 truncate">{{ task.name }}</div>
                  </div>
                  
                  <!-- Task progress indicator -->
                  <div class="w-12 flex-shrink-0">
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        class="h-1.5 rounded-full" 
                        :class="getProgressBarColorClass(task.progress)"
                        :style="{ width: `${task.progress || 0}%` }"
                      ></div>
                    </div>
                    <div class="text-xs text-center text-gray-500 mt-0.5">{{ task.progress || 0 }}%</div>
                  </div>
                </div>
                <div v-if="project.tasks.length === 0" class="task-row flex items-center px-4 py-2.5 pl-10 italic text-gray-400 text-sm">
                  No tasks found
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side: Timeline chart -->
        <div class="gantt-timeline relative">
          <!-- Timeline header (sticky) -->
          <div class="timeline-header h-16 sticky top-0 z-10 border-b border-gray-200 bg-gray-50">
            <!-- Top-level time units (months or weeks) -->
            <div class="h-8 flex border-b border-gray-200">
              <div
                v-for="timeUnit in timeUnits.major"
                :key="timeUnit.key"
                class="border-r border-gray-300 relative flex items-center justify-center"
                :style="{ width: `${timeUnit.width}px` }"
              >
                <span class="text-xs font-medium text-gray-700">{{ timeUnit.label }}</span>
              </div>
            </div>
            
            <!-- Detail time units (days) -->
            <div class="h-8 flex">
              <div
                v-for="timeUnit in timeUnits.minor"
                :key="timeUnit.key"
                :class="[
                  'border-r border-gray-200 relative flex items-center justify-center',
                  timeUnit.isWeekend ? 'bg-gray-100' : '',
                  timeUnit.isToday ? 'bg-red-50' : ''
                ]"
                :style="{ width: `${getDayWidth()}px` }"
              >
                <span class="text-xs text-gray-500">{{ timeUnit.label }}</span>
              </div>
            </div>
          </div>

          <!-- Gantt bars area -->
          <div class="timeline-content">
            <!-- Project and task bars -->
            <div class="gantt-bars">
              <div
                v-for="(project) in projects"
                :key="project.id"
                class="project-bar-container"
              >
                <!-- Project timeline row -->
                <div 
                  class="project-timeline-row relative h-12 hover:bg-gray-50"
                  :class="{ 'bg-gray-50': project.expanded, 'border-b border-gray-100': !project.expanded }"
                >
                  <!-- Date grid background -->
                  <div class="absolute inset-0 grid-background">
                    <div
                      v-for="timeUnit in timeUnits.minor"
                      :key="timeUnit.key"
                      :class="[
                        'absolute top-0 bottom-0 border-r border-gray-200',
                        timeUnit.isWeekend ? 'bg-gray-100' : '',
                        timeUnit.isToday ? 'bg-red-50' : ''
                      ]"
                      :style="{ 
                        left: `${getTimeUnitPosition(timeUnit)}px`,
                        width: `${getDayWidth()}px`
                      }"
                    ></div>
                  </div>
                  
                  <!-- Project timeline bar -->
                  <div
                    v-if="getBarPosition(project).width > 0"
                    class="absolute top-1/2 transform -translate-y-1/2 h-7 rounded-md shadow-sm cursor-pointer border z-10"
                    :class="getProjectStatusClass(project.state)"
                    :style="{
                      left: `${getBarPosition(project).left}px`,
                      width: `${getBarPosition(project).width}px`
                    }"
                    @click.stop="handleProjectClick(project)"
                    :title="getProjectTooltip(project)"
                  >
                    <!-- Progress indicator -->
                    <div 
                      class="absolute top-0 left-0 bottom-0 rounded-l-md transition-all duration-300"
                      :class="getProgressBarClass(project.state, project.progress)"
                      :style="{ width: `${project.progress || 0}%` }"
                    ></div>
                    
                    <!-- Text label (only if enough space) -->
                    <div v-if="getBarPosition(project).width > 50" class="px-2 py-1 flex items-center h-full z-20 relative">
                      <span class="text-xs font-medium truncate text-current">{{ project.name }}</span>
                    </div>
                  </div>
                    
                  <!-- Today indicator (vertical line) -->
                  <div
                    v-if="isTodayVisible"
                    class="absolute top-0 bottom-0 w-px bg-red-500 z-20"
                    :style="{ left: `${getTodayPosition()}px` }"
                  ></div>
                </div>
                
                <!-- Task timeline bars (when project expanded) -->
                <div v-if="project.expanded">
                  <div
                    v-for="task in project.tasks"
                    :key="task.id"
                    class="task-timeline-row relative h-10 hover:bg-gray-100 border-t border-gray-100"
                  >
                    <!-- Date grid background -->
                    <div class="absolute inset-0 grid-background">
                      <div
                        v-for="timeUnit in timeUnits.minor"
                        :key="timeUnit.key"
                        :class="[
                          'absolute top-0 bottom-0 border-r border-gray-200',
                          timeUnit.isWeekend ? 'bg-gray-100' : '',
                          timeUnit.isToday ? 'bg-red-50' : ''
                        ]"
                        :style="{ 
                          left: `${getTimeUnitPosition(timeUnit)}px`,
                          width: `${getDayWidth()}px`
                        }"
                      ></div>
                    </div>
                    
                    <!-- Task timeline bar -->
                    <div
                      v-if="getBarPosition(task).width > 0"
                      class="absolute top-1/2 transform -translate-y-1/2 h-6 rounded-md shadow-sm cursor-pointer border z-10"
                      :class="getTaskStatusClass(task.state)"
                      :style="{
                        left: `${getBarPosition(task).left}px`,
                        width: `${getBarPosition(task).width}px`
                      }"
                      @click.stop="handleTaskClick(task)"
                      :title="getTaskTooltip(task, project)"
                    >
                      <!-- Progress indicator -->
                      <div 
                        class="absolute top-0 left-0 bottom-0 rounded-l-md transition-all duration-300"
                        :class="getProgressBarClass(task.state, task.progress)"
                        :style="{ width: `${task.progress || 0}%` }"
                      ></div>
                        
                      <!-- Text label (only if enough space) -->
                      <div v-if="getBarPosition(task).width > 50" class="px-2 py-1 flex items-center h-full z-20 relative">
                        <span class="text-xs truncate text-current">{{ task.name }}</span>
                      </div>
                      
                      <!-- Assigned Users (if space permits) -->
                      <div 
                        v-if="task.assigned_to && task.assigned_to.length > 0 && getBarPosition(task).width > 150"
                        class="absolute -bottom-1.5 right-1.5 flex -space-x-1.5"
                      >
                        <div 
                          v-for="(user, index) in task.assigned_to.slice(0, 3)" 
                          :key="index"
                          class="h-5 w-5 rounded-full bg-gray-200 border border-white text-xs flex items-center justify-center overflow-hidden"
                          :title="user.name"
                        >
                          <span>{{ getInitials(user.name) }}</span>
                        </div>
                        <div 
                          v-if="task.assigned_to.length > 3"
                          class="h-5 w-5 rounded-full bg-gray-200 border border-white text-xs flex items-center justify-center"
                          :title="getRemainingUsersTitle(task.assigned_to, 3)"
                        >
                          <span>+{{ task.assigned_to.length - 3 }}</span>
                        </div>
                      </div>
                    </div>
                      
                    <!-- Today indicator (vertical line) -->
                    <div
                      v-if="isTodayVisible"
                      class="absolute top-0 bottom-0 w-px bg-red-500 z-20"
                      :style="{ left: `${getTodayPosition()}px` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div 
      v-if="loading" 
      class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-30"
    >
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent"></div>
        <p class="mt-2 text-sm text-gray-600">Loading timeline...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="!loading && projects.length === 0" 
      class="flex flex-col items-center justify-center p-10 flex-grow"
    >
      <CalendarIcon class="h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
      <p v-if="departmentId" class="mt-1 text-sm text-gray-500">
        No projects found in the selected department or date range.
      </p>
      <p v-else class="mt-1 text-sm text-gray-500">
        Create some projects with tasks to see them on the timeline.
      </p>
      <button
        v-if="departmentId || startDateFilter || endDateFilter"
        @click="$emit('resetFilters')"
        class="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <ArrowPathIcon class="h-4 w-4 mr-1.5" />
        Reset Filters
      </button>
    </div>

    <!-- Task Detail Modal -->
    <TaskDetailPopup
      :show="showTaskModal"
      :task-id="selectedTaskId"
      @close="closeTaskModal"
      @edit-task="handleEditTask"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MinusIcon, 
  PlusIcon, 
  CalendarIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline';
import { 
  format, 
  parseISO, 
  addDays, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isWeekend, 
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  differenceInDays,
  isSameMonth
} from 'date-fns';
import apiClient from '@/config/api';
import TaskDetailPopup from '@/components/team/TaskDetailPopup.vue';

const props = defineProps({
  departmentId: {
    type: [Number, String],
    default: null
  },
  projectId: {
    type: [Number, String],
    default: null
  },
  singleProject: {
    type: Boolean,
    default: false
  },
  startDateFilter: {
    type: String,
    default: null
  },
  endDateFilter: {
    type: String,
    default: null
  },
  departmentName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'view-task-detail', 
  'view-project-detail',
  'edit-task',
  'update:dateRange',
  'clearFilter',
  'resetFilters'
]);

// State
const projects = ref([]);
const loading = ref(false);
const startDate = ref(new Date());
const viewMode = ref('month'); // 'day', 'week', 'month'
const zoomLevel = ref(1);
const minZoomLevel = ref(0.5);
const maxZoomLevel = ref(3);
const allExpanded = ref(false);
const error = ref(null);
const showTaskModal = ref(false);
const selectedTaskId = ref(null);
const isInternalNavigation = ref(false);

// Format date range for display
const dateRangeLabel = computed(() => {
  if (props.startDateFilter && props.endDateFilter) {
    try {
      const start = format(parseISO(props.startDateFilter), 'MMM d, yyyy');
      const end = format(parseISO(props.endDateFilter), 'MMM d, yyyy');
      return `${start} - ${end}`;
    } catch (e) {
      return `${props.startDateFilter} - ${props.endDateFilter}`;
    }
  }
  return '';
});

// Computed properties
const timelinePeriodLabel = computed(() => {
  if (viewMode.value === 'month') {
    const monthStart = startOfMonth(startDate.value);
    const monthEnd = endOfMonth(startDate.value);
    return `${format(monthStart, 'MMMM yyyy')}`;
  } else if (viewMode.value === 'week') {
    const weekStart = startOfWeek(startDate.value, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(startDate.value, { weekStartsOn: 1 });
    return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
  } else { // day view
    const dayStart = startDate.value;
    const dayEnd = addDays(startDate.value, 14); // Show 2 weeks in day view
    return `${format(dayStart, 'MMM d')} - ${format(dayEnd, 'MMM d, yyyy')}`;
  }
});

// Effective date range based on view mode and filters
const effectiveDateRange = computed(() => {
  // Generate date range based on view mode and current startDate
  let rangeStart, rangeEnd;
  
  if (viewMode.value === 'month') {
    rangeStart = startOfMonth(startDate.value);
    rangeEnd = endOfMonth(startDate.value);
  } else if (viewMode.value === 'week') {
    rangeStart = startOfWeek(startDate.value, { weekStartsOn: 1 });
    rangeEnd = endOfWeek(startDate.value, { weekStartsOn: 1 });
  } else { // day view
    rangeStart = startDate.value;
    rangeEnd = addDays(startDate.value, 14); // 2 weeks default
  }
  
  // If props provide date filters and not in internal navigation mode,
  // use them for display but DON'T update internal startDate
  if (props.startDateFilter && props.endDateFilter && !isInternalNavigation.value) {
    try {
      const start = parseISO(props.startDateFilter);
      const end = parseISO(props.endDateFilter);
      
      // Make sure both dates are valid
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        return { start, end };
      }
    } catch (e) {
      console.error('Error parsing date filters:', e);
    }
  }
  
  // Ensure both dates are valid
  if (isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
    const today = new Date();
    rangeStart = startOfMonth(today);
    rangeEnd = endOfMonth(today);
  }
  
  return { start: rangeStart, end: rangeEnd };
});

// Time units for the timeline display
const timeUnits = computed(() => {
  try {
    // Get date range safely
    const rangeStart = effectiveDateRange.value.start;
    const rangeEnd = effectiveDateRange.value.end;
    
    // Validate dates
    if (!rangeStart || !rangeEnd || isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
      console.error('Invalid date range for time units calculation');
      return { major: [], minor: [] };
    }
    
    // Generate all days in the range
    const days = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
    
    // Major time units (months)
    const majorUnits = [];
    let currentMonth = null;
    let currentMonthDays = 0;
    
    days.forEach((day, index) => {
      const month = format(day, 'yyyy-MM');
      
      // If new month or first day
      if (month !== currentMonth || index === 0) {
        // Finish previous month if exists
        if (currentMonth && currentMonthDays > 0) {
          majorUnits[majorUnits.length - 1].width = currentMonthDays * getDayWidth();
        }
        
        // Start new month
        currentMonth = month;
        currentMonthDays = 1;
        
        majorUnits.push({
          key: month,
          label: format(day, 'MMMM yyyy'),
          start: day,
          end: null, // Will be set later
          width: 0 // Will be updated later
        });
      } else {
        // Still in same month
        currentMonthDays++;
        
        // If last day, update width of last month
        if (index === days.length - 1) {
          majorUnits[majorUnits.length - 1].width = currentMonthDays * getDayWidth();
          majorUnits[majorUnits.length - 1].end = day;
        }
      }
    });
    
    // Minor time units (days)
    const minorUnits = days.map(day => ({
      key: format(day, 'yyyy-MM-dd'),
      label: format(day, 'd'),
      date: day,
      isWeekend: isWeekend(day),
      isToday: isToday(day),
      monthLabel: format(day, 'MMM'),
      position: 0 // Will be calculated in getTimeUnitPosition
    }));
    
    return {
      major: majorUnits,
      minor: minorUnits
    };
  } catch (error) {
    console.error('Error generating time units:', error);
    return { major: [], minor: [] };
  }
});

// Check if today is visible in the current view
const isTodayVisible = computed(() => {
  try {
    // Get today's date
    const today = new Date();
    
    // Get the current view range
    const viewRange = effectiveDateRange.value;
    
    // Check if today falls within the current view range
    return today >= viewRange.start && today <= viewRange.end;
  } catch (error) {
    console.error('Error calculating if today is visible:', error);
    return false;
  }
});

// Methods for ProjectGanttChart

// Core data fetching function
function fetchProjects() {
  loading.value = true;
  error.value = null;
  
  // Initialize request parameters
  const params = {
    jsonrpc: '2.0',
    id: new Date().getTime(),
    params: {}
  };
  
  // Get date range, either from props or from internal state
  let dateStart, dateEnd;
  
  if (props.startDateFilter && props.endDateFilter && !isInternalNavigation.value) {
    // Use props directly
    dateStart = props.startDateFilter;
    dateEnd = props.endDateFilter;
  } else {
    // Use the calculated date range from our component
    const dateRange = effectiveDateRange.value;
    dateStart = format(dateRange.start, 'yyyy-MM-dd');
    dateEnd = format(dateRange.end, 'yyyy-MM-dd');
  }
  
  // Add date parameters to the params object
  params.params.date_start = dateStart;
  params.params.date_end = dateEnd;
  
  // Add department id if present
  if (props.departmentId) {
    console.log('Including department filter:', props.departmentId);
    params.params.department_id = parseInt(props.departmentId);
  }

  // Debug logging
  console.log('Fetching Gantt data with params:', JSON.stringify(params));

  // API call
  apiClient.post('/web/v2/team/dashboard/timeline', params)
    .then(response => {
      if (response.data.result?.status === 'success') {
        console.log('Gantt data fetched successfully');
        // Transform data to match our component structure
        const projectsData = response.data.result.data || [];
        projects.value = projectsData.map(project => {
          // Safely handle date parsing
          let startDate, endDate;
          try {
            startDate = project.start ? parseISO(project.start) : new Date();
          } catch (e) {
            console.warn('Invalid start date for project:', project.id);
            startDate = new Date();
          }
          
          try {
            endDate = project.end ? parseISO(project.end) : addDays(new Date(), 30);
          } catch (e) {
            console.warn('Invalid end date for project:', project.id);
            endDate = addDays(new Date(), 30);
          }
          
          return {
            id: project.id,
            name: project.name,
            startDate: project.start || null, // Keep the original string for reference
            endDate: project.end || null,     // Keep the original string for reference
            start: startDate,
            end: endDate,
            progress: project.progress || 0,
            state: project.type === 'project' ? (project.state || 'in_progress') : 'task',
            expanded: false,
            tasks: (project.children || []).map(task => {
              // Safely handle task date parsing
              let taskStartDate, taskEndDate;
              try {
                taskStartDate = task.start ? parseISO(task.start) : new Date();
              } catch (e) {
                console.warn('Invalid start date for task:', task.id);
                taskStartDate = new Date();
              }
              
              try {
                taskEndDate = task.end ? parseISO(task.end) : addDays(new Date(), 7);
              } catch (e) {
                console.warn('Invalid end date for task:', task.id);
                taskEndDate = addDays(new Date(), 7);
              }
              
              return {
                id: task.id,
                name: task.name,
                startDate: task.start || null, // Keep the original string
                endDate: task.end || null,     // Keep the original string
                start: taskStartDate,
                end: taskEndDate,
                progress: task.progress || 0,
                state: task.state || 'in_progress',
                assigned_to: task.assigned_to || []
              };
            })
          };
        });
      } else {
        console.error('Error fetching Gantt data:', response.data.result?.message);
        error.value = response.data.result?.message || 'Failed to load projects';
      }
    })
    .catch(err => {
      console.error('API error fetching project timeline data:', err);
      error.value = 'Error loading project data';
    })
    .finally(() => {
      loading.value = false;
    });
}

// Timeline navigation and control methods
function getDayWidth() {
  // Base day width multiplied by zoom level
  const baseDayWidth = 30;
  return baseDayWidth * zoomLevel.value;
}

function getTimeUnitPosition(timeUnit) {
  const viewStart = effectiveDateRange.value.start;
  const daysFromViewStart = differenceInDays(timeUnit.date, viewStart);
  return daysFromViewStart * getDayWidth();
}

function getBarPosition(item) {
  // Check if item or required properties are missing
  if (!item || !item.start || !item.end) {
    return { left: 0, width: 0 };
  }
  
  try {
    // Use effectiveDateRange instead of view-based range
    const viewStart = effectiveDateRange.value.start;
    const viewEnd = effectiveDateRange.value.end;
    
    // Safe parsing of dates - ensure they're Date objects
    const itemStartDate = typeof item.start === 'string' ? parseISO(item.start) : item.start;
    const itemEndDate = typeof item.end === 'string' ? parseISO(item.end) : item.end;
    
    // Validate parsed dates
    if (!itemStartDate || !itemEndDate || isNaN(itemStartDate.getTime()) || isNaN(itemEndDate.getTime())) {
      return { left: 0, width: 0 };
    }
    
    // If item is completely outside the view
    if (itemEndDate < viewStart || itemStartDate > viewEnd) {
      return { left: 0, width: 0 };
    }
    
    // Calculate start position
    const effectiveStart = itemStartDate < viewStart ? viewStart : itemStartDate;
    const daysFromViewStart = differenceInDays(effectiveStart, viewStart);
    const leftPosition = daysFromViewStart * getDayWidth();
    
    // Calculate width
    const effectiveEnd = itemEndDate > viewEnd ? viewEnd : itemEndDate;
    const itemDuration = differenceInDays(effectiveEnd, effectiveStart) + 1; // +1 because end date is inclusive
    const width = itemDuration * getDayWidth();
    
    return { left: leftPosition, width: width };
  } catch (error) {
    console.error('Error calculating bar position:', error);
    return { left: 0, width: 0 };
  }
}

function getTodayPosition() {
  try {
    const today = new Date();
    // Use effectiveDateRange.value.start directly
    const viewStart = effectiveDateRange.value.start;
    
    if (!viewStart || isNaN(viewStart.getTime())) {
      return 0;
    }
    
    const daysFromViewStart = differenceInDays(today, viewStart);
    return Math.max(0, daysFromViewStart * getDayWidth());
  } catch (error) {
    console.error('Error calculating today position:', error);
    return 0;
  }
}

// Navigation methods
function moveTimelinePrev() {
  try {
    isInternalNavigation.value = true;
    
    // Update the internal startDate
    if (viewMode.value === 'month') {
      startDate.value = subMonths(startDate.value, 1);
    } else if (viewMode.value === 'week') {
      startDate.value = subWeeks(startDate.value, 1);
    } else { // day view
      startDate.value = subDays(startDate.value, 14);
    }
    
    // Calculate the new date range
    const range = effectiveDateRange.value;
    
    // Emit the new date range to parent component
    emit('update:dateRange', {
      start: format(range.start, 'yyyy-MM-dd'),
      end: format(range.end, 'yyyy-MM-dd')
    });
    
    // Fetch projects with the new date range
    fetchProjects();
  } catch (error) {
    console.error('Error navigating to previous period:', error);
  }
}

function moveTimelineNext() {
  try {
    isInternalNavigation.value = true;
    
    // Update the internal startDate
    if (viewMode.value === 'month') {
      startDate.value = addMonths(startDate.value, 1);
    } else if (viewMode.value === 'week') {
      startDate.value = addWeeks(startDate.value, 1);
    } else { // day view
      startDate.value = addDays(startDate.value, 14);
    }
    
    // Calculate the new date range
    const range = effectiveDateRange.value;
    
    // Emit the new date range to parent component
    emit('update:dateRange', {
      start: format(range.start, 'yyyy-MM-dd'),
      end: format(range.end, 'yyyy-MM-dd')
    });
    
    // Fetch projects with the new date range
    fetchProjects();
  } catch (error) {
    console.error('Error navigating to next period:', error);
  }
}

function resetTimeline() {
  try {
    isInternalNavigation.value = true;
    
    // Reset to current date
    startDate.value = new Date();
    
    // Calculate the new date range based on current date
    const newRange = effectiveDateRange.value;
    
    // Emit the new date range to parent component
    emit('update:dateRange', {
      start: format(newRange.start, 'yyyy-MM-dd'),
      end: format(newRange.end, 'yyyy-MM-dd')
    });
    
    // Fetch projects with the new date range
    fetchProjects();
  } catch (error) {
    console.error('Error resetting timeline:', error);
  } finally {
    isInternalNavigation.value = false;
  }
}

function setViewMode(mode) {
  try {
    // Don't do anything if the mode is already set
    if (viewMode.value === mode) return;
    
    isInternalNavigation.value = true;
    
    // Update the view mode
    viewMode.value = mode;
    
    // Calculate the new date range based on new view mode
    const newRange = effectiveDateRange.value;
    
    // Emit the new date range to parent component
    emit('update:dateRange', {
      start: format(newRange.start, 'yyyy-MM-dd'),
      end: format(newRange.end, 'yyyy-MM-dd')
    });
    
    // Fetch projects with the new view mode and date range
    fetchProjects();
  } catch (error) {
    console.error('Error changing view mode:', error);
  } finally {
    isInternalNavigation.value = false;
  }
}

// Zoom methods
function increaseZoom() {
  if (zoomLevel.value < maxZoomLevel.value) {
    zoomLevel.value += 0.5;
  }
}

function decreaseZoom() {
  if (zoomLevel.value > minZoomLevel.value) {
    zoomLevel.value -= 0.5;
  }
}

// Project and task interaction
function toggleProject(projectIndex) {
  projects.value[projectIndex].expanded = !projects.value[projectIndex].expanded;
  
  // Check if all projects are now expanded
  allExpanded.value = projects.value.every(project => project.expanded);
}

function toggleExpandAll() {
  allExpanded.value = !allExpanded.value;
  projects.value.forEach(project => {
    project.expanded = allExpanded.value;
  });
}

function handleProjectClick(project) {
  // Add defensive validation
  if (!project || !project.id) {
    console.warn('Attempted to view invalid project');
    return;
  }
  
  // Emit event to parent component
  emit('view-project-detail', project);
}

function handleTaskClick(task) {
  if (!task || !task.id) {
    console.warn('Attempted to view invalid task');
    return;
  }
  
  // Hanya tampilkan modal tanpa navigasi halaman
  selectedTaskId.value = task.id;
  showTaskModal.value = true;
  
  // Jangan memancarkan event view-task-detail
  // ATAU ubah penanganan event di komponen induk
}

function closeTaskModal() {
  showTaskModal.value = false;
  selectedTaskId.value = null;
}

function handleEditTask(task) {
  // Close modal
  closeTaskModal();
  
  // Emit edit event to parent component
  emit('edit-task', task);
}

// Helper methods for tooltips and formatting
function getProjectTooltip(project) {
  if (!project) return '';
  
  let tooltip = `Project: ${project.name || 'Unnamed Project'}\n`;
  
  try {
    if (project.startDate) {
      tooltip += `Start: ${format(parseISO(project.startDate), 'MMMM d, yyyy')}\n`;
    }
  } catch (e) {
    tooltip += 'Start: Not set\n';
  }
  
  try {
    if (project.endDate) {
      tooltip += `End: ${format(parseISO(project.endDate), 'MMMM d, yyyy')}\n`;
    }
  } catch (e) {
    tooltip += 'End: Not set\n';
  }
  
  tooltip += `Progress: ${project.progress || 0}%\n`;
  tooltip += `Status: ${formatState(project.state)}`;
  
  return tooltip;
}

function getTaskTooltip(task, project) {
  if (!task) return '';
  
  let tooltip = `Task: ${task.name || 'Unnamed Task'}\n`;
  
  if (project) {
    tooltip += `Project: ${project.name || 'Unnamed Project'}\n`;
  }
  
  try {
    if (task.startDate) {
      tooltip += `Start: ${format(parseISO(task.startDate), 'MMMM d, yyyy')}\n`;
    }
  } catch (e) {
    tooltip += 'Start: Not set\n';
  }
  
  try {
    if (task.endDate) {
      tooltip += `End: ${format(parseISO(task.endDate), 'MMMM d, yyyy')}\n`;
    }
  } catch (e) {
    tooltip += 'End: Not set\n';
  }
  
  tooltip += `Progress: ${task.progress || 0}%\n`;
  tooltip += `Status: ${formatState(task.state)}`;
  
  if (task.assigned_to && task.assigned_to.length > 0) {
    tooltip += `\nAssigned to: ${task.assigned_to.map(u => u.name).join(', ')}`;
  }
  
  return tooltip;
}

function formatState(state) {
  // Convert snake_case to Title Case
  return state
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Visual styling helper methods
function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function getRemainingUsersTitle(users, shown) {
  if (!users || users.length <= shown) return '';
  return users.slice(shown).map(u => u.name).join(', ');
}

function getStatusIndicatorClass(state) {
  const classes = {
    'draft': 'bg-gray-400',
    'planning': 'bg-blue-400',
    'in_progress': 'bg-green-400',
    'on_hold': 'bg-yellow-400',
    'review': 'bg-purple-400',
    'completed': 'bg-indigo-400',
    'done': 'bg-indigo-400',
    'cancelled': 'bg-red-400'
  };
  
  return classes[state] || 'bg-gray-400';
}

function getProjectStatusClass(state) {
  // Return appropriate CSS classes for project bars based on state
  const classes = {
    'draft': 'bg-gray-100 border-gray-300 text-gray-800',
    'planning': 'bg-blue-100 border-blue-300 text-blue-800',
    'in_progress': 'bg-green-100 border-green-300 text-green-800',
    'on_hold': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'completed': 'bg-indigo-100 border-indigo-300 text-indigo-800',
    'cancelled': 'bg-red-100 border-red-300 text-red-800'
  };
  
  return classes[state] || 'bg-gray-100 border-gray-300 text-gray-800';
}

function getTaskStatusClass(state) {
  // Return appropriate CSS classes for task bars based on state
  const classes = {
    'draft': 'bg-gray-50 border-gray-200 text-gray-700',
    'planned': 'bg-blue-50 border-blue-200 text-blue-700',
    'in_progress': 'bg-green-50 border-green-200 text-green-700',
    'review': 'bg-purple-50 border-purple-200 text-purple-700',
    'done': 'bg-indigo-50 border-indigo-200 text-indigo-700',
    'cancelled': 'bg-red-50 border-red-200 text-red-700'
  };
  
  return classes[state] || 'bg-gray-50 border-gray-200 text-gray-700';
}

function getProgressBarClass(state, progress) {
  const baseClasses = {
    'draft': 'bg-gray-300',
    'planning': 'bg-blue-300',
    'in_progress': 'bg-green-300',
    'on_hold': 'bg-yellow-300',
    'review': 'bg-purple-300',
    'completed': 'bg-indigo-300',
    'done': 'bg-indigo-300',
    'cancelled': 'bg-red-300',
    'planned': 'bg-blue-300'
  };
  
  const baseClass = baseClasses[state] || 'bg-gray-300';
  
  // Add opacity based on progress
  const opacity = progress >= 100 ? '' : (progress >= 50 ? ' bg-opacity-90' : ' bg-opacity-70');
  
  return `${baseClass}${opacity}`;
}

function getProgressBarColorClass(progress) {
  if (progress >= 100) {
    return 'bg-green-500'; // Completed - Green
  } else if (progress >= 75) {
    return 'bg-green-400'; // Almost done - Light Green
  } else if (progress >= 50) {
    return 'bg-yellow-400'; // Half way - Yellow
  } else if (progress >= 25) {
    return 'bg-orange-400'; // Started - Orange
  } else {
    return 'bg-red-400'; // Just started - Red
  }
}

// Lifecycle hooks and watches

// On component mount, initialize and fetch data
onMounted(() => {
  console.log('Gantt Chart component mounted');
  console.log('Department ID from props:', props.departmentId);
  
  // Initialize startDate from props if available, but only once
  if (props.startDateFilter) {
    try {
      const date = parseISO(props.startDateFilter);
      if (!isNaN(date.getTime())) {
        startDate.value = date;
      }
    } catch (e) {
      console.error('Error parsing initial startDateFilter:', e);
    }
  }
  
  // Initial data fetch (only once)
  fetchProjects();
});

// Watch for prop changes to refresh data
watch(
  [() => props.startDateFilter, () => props.endDateFilter, () => props.departmentId],
  ([newStart, newEnd, newDept], [oldStart, oldEnd, oldDept]) => {
    console.log('Filter change detected:');
    console.log('Department ID changed:', oldDept, '->', newDept);
    console.log('Date range changed:', oldStart, oldEnd, '->', newStart, newEnd);
    
    // Only react to actual changes from parent, not self-triggered ones
    if ((newStart !== oldStart || newEnd !== oldEnd || newDept !== oldDept) && !isInternalNavigation.value) {
      // If date filters change, update starting point
      if (newStart && newStart !== oldStart) {
        try {
          const date = parseISO(newStart);
          if (!isNaN(date.getTime())) {
            startDate.value = date;
          }
        } catch (e) {
          console.error('Error parsing startDateFilter:', e);
        }
      }
      
      // Fetch projects with updated filters
      fetchProjects();
    }
  }
);

// Reset internal navigation flag when loading finishes
watch(loading, (newVal, oldVal) => {
  if (oldVal === true && newVal === false) {
    isInternalNavigation.value = false;
  }
});

// Export methods for use in template
</script>

/* Add these styles to your component */
<style scoped>
.gantt-container {
  height: calc(100vh - 250px);
  min-height: 500px;
}

.project-names {
  overflow-y: auto;
  position: sticky;
  left: 0;
  z-index: 20;
  border-right: 1px solid #e5e7eb;
  box-shadow: 4px 0 6px -2px rgba(0, 0, 0, 0.05);
}

.gantt-timeline {
  overflow: auto;
}

.project-bar-container:nth-child(odd) .project-timeline-row {
  background-color: #f9fafb;
}

.project-bar-container:nth-child(odd) .task-timeline-row {
  background-color: #f3f4f6;
}

.timeline-content {
  position: relative;
}

/* Smooth transitions for hover and expand/collapse */
.project-row, .task-row {
  transition: background-color 0.15s ease;
}

.project-timeline-row, .task-timeline-row {
  transition: background-color 0.15s ease;
}

/* Additional custom scrollbar styles for better UX */
.gantt-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.gantt-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.gantt-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.gantt-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Animation for loading state */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Today indicator pulsing effect */
.today-indicator {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom tooltip for task details */
.task-tooltip {
  position: absolute;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 30;
  max-width: 250px;
  font-size: 12px;
}
</style>