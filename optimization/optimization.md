## Node.js Advanced Concepts

### Node Backed by C++

<img width="404" alt="js-to-cpp-pipline" src="https://user-images.githubusercontent.com/20265633/38226632-aab1ee62-36c8-11e8-95e7-26bc90ba5dda.PNG">

### The Basic of Threads and Process

Whenever we run programs on our computer, we start up a process. A process is an instance of a computer program that has been executed. **Within a single process we can have multiple threads.** Threads are like a little to-do list that needs to be executed by the CPU from the top the going down, and each of them might have some urgent responsibility assigned to it. Decide which order to execute these threads in is referred to as **scheduling**. Scheduling is controlled by operating system.

### Node Event Loop

Whenever we start a node program on computer, node automatically creates one thread and then executes all code inside of that one single thread. Inside of the thread, there's an event loop. The event loop is like a control sturcture that decides what the thread should be doing at any given point of time.

Pseudocode that mocks event loop:

```
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldcontinue() {
	// Check one: Any pending setTimeout, setInterval, setImmediate?
	// Check two: Any pending OS tasks? (Like server listening to port)
	// Check three: Any pending long running operations? (Like fs module)
	return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;

}

// Entire body executes in one 'tick'
while(shouldContinue()) {
	// 1. Node looks at pendingTimers and sees if any functions
	// are ready to be called. setTimeout, setInterval

	// 2. Node looks at pendingOSTasks and pendingOperations
	// and calls relavent callbacks

	// 3. Pause execution. Continue when...
	// - a new pendingOSTask is done
	// - a new pendingOperations si done
	// - a timer is about to complete

	// 4. Look at pendingTimers. Call any setImmediate

	// 5. Handle any 'close' events
}

// Exit back to terminal

```

Question: Is Node single threaded?

Answer: Node event loop is single threaded, but some of Node frameworks/stdlib are not. (see [threads.js](threads.js))

<img width="285" alt="pbkdf2-pipline" src="https://user-images.githubusercontent.com/20265633/38264132-1b28b67c-3740-11e8-9151-f087e63a5cbc.PNG">
