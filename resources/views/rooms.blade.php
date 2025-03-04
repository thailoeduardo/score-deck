<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Sala disponivel') }}
        </h2>
    </x-slot>



    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    @foreach ($rooms as $room)


                    {{-- // depois valida se a ultiam sala esta aberta para jogadas --}}
                    <p>
                        <a href="/room/{{ $room['id'] }}"> Sala {{ $room['id'] }}</a>
                    </p>
                    @endforeach ($rooms as $room)



                    <form action="/rooms" method="post">
                        @csrf

                        {{-- <div class="mb-4">
                            <select name="user_id" id="user_id" class="form-select rounded-md shadow-sm mt-1 block w-full">
                                <option value="">Select User</option>
                                @foreach($users as $user)
                                    <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                        {{ $user->name }}
                                    </option>
                                @endforeach
                            </select> --}}

                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cirar sala</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
