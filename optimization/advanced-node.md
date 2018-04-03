## Node.js Advanced Concepts

### Node Backed by C++

<img width="404" alt="js-to-cpp-pipline" src="https://user-images.githubusercontent.com/20265633/38226632-aab1ee62-36c8-11e8-95e7-26bc90ba5dda.PNG">

### The Basic of Threads and Process

Whenever we run programs on our computer, we start up a process. A process is an instance of a computer program that has been executed. **Within a single process we can have multiple threads.** Threads are like a little to-do list that needs to be executed by the CPU from the top the going down, and each of them might have some urgent responsibility assigned to it. Decide which order to execute these threads in is referred to as **scheduling**. Scheduling is controlled by operating system.

### Node Event Loop

Whenever we start a node program on computer, node automatically creates one thread and then executes all code inside of that one single thread. Inside of the thread, there's an event loop. The event loop is like a control sturcture that decides what the thread should be doing at any given point of time.

Pseudocode that mocks event loop:

```JavaScript
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

### Is Node single threaded?

Node event loop is single threaded, but some of Node frameworks/stdlib are not. (see [threads.js](threads.js) and [async.js](async.js))

<img width="285" alt="pbkdf2-pipline" src="https://user-images.githubusercontent.com/20265633/38264132-1b28b67c-3740-11e8-9151-f087e63a5cbc.PNG">

Thread pool questions:

Q: Can we use the thread pool for JavaScript code or can only NodeJS functions use it?

A: We can write custon JavaScript that uses the thread pool.

Q: What functions in Node std library use the thread pool?

A: All 'fs' module functions. Some crypto stuff. Depends on operating systems. (Win vs Unix based)

Q: How does this thread pool stuff fit into the event loop?

A: Tasks running in the stread pool are the 'pendingOperations' in the pseudocode example.

<img width="280" alt="async-pipline" src="https://user-images.githubusercontent.com/20265633/38267205-c58bc98a-3748-11e8-8e87-fb1bd0bbc605.PNG">

OS/Async questions:

Q: What functions in Node std library use the OS's async features?

A: Almost everything around networking for all OS's. Some other stuff is OS specific.

Q: How does this OS async stuff fit into the event loop?

A: Tasks using the underlying OS are reflected in the 'pendingOSTasks' array in pseudocode example.

### Improving Node Performance

1. Use Node in 'Cluster' Mode -- Recommended
2. Use Worker Threads -- Experimental